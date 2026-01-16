import { prisma } from './prisma';
import { PLANS, PlanId } from './stripe';

export interface SubscriptionInfo {
    plan: PlanId | 'free';
    status: string;
    billingCycle: 'monthly' | 'yearly' | null;
    scenarioCount: number;
    scenarioLimit: number | null;
    canCalculate: boolean;
    currentPeriodEnd: Date | null;
}

export async function getSubscription(userId: string): Promise<SubscriptionInfo> {
    const subscription = await prisma.userSubscription.findUnique({
        where: { userId },
    });

    if (!subscription || subscription.status !== 'active') {
        return {
            plan: 'free',
            status: subscription?.status || 'inactive',
            billingCycle: null,
            scenarioCount: 0,
            scenarioLimit: 0, // Free users can't calculate
            canCalculate: false,
            currentPeriodEnd: null,
        };
    }

    const planId = subscription.plan as PlanId;
    const planConfig = PLANS[planId];

    return {
        plan: planId,
        status: subscription.status,
        billingCycle: subscription.billingCycle as 'monthly' | 'yearly' | null,
        scenarioCount: subscription.scenarioCount,
        scenarioLimit: planConfig?.scenarioLimit || null,
        canCalculate: true,
        currentPeriodEnd: subscription.currentPeriodEnd,
    };
}

export async function canUserCalculate(userId: string): Promise<{ allowed: boolean; reason?: string }> {
    const info = await getSubscription(userId);

    if (info.plan === 'free') {
        return { allowed: false, reason: 'subscription_required' };
    }

    // Check scenario limit for Solo plan
    if (info.plan === 'solo' && info.scenarioLimit !== null) {
        if (info.scenarioCount >= info.scenarioLimit) {
            return { allowed: false, reason: 'scenario_limit_reached' };
        }
    }

    return { allowed: true };
}

export async function incrementScenarioCount(userId: string): Promise<void> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    await prisma.userSubscription.upsert({
        where: { userId },
        update: {
            scenarioCount: {
                increment: 1,
            },
            // Reset count if new month
            scenarioResetDate: startOfMonth,
        },
        create: {
            userId,
            scenarioCount: 1,
            scenarioResetDate: startOfMonth,
        },
    });
}

export async function createOrUpdateSubscription(
    userId: string,
    data: {
        stripeCustomerId?: string;
        stripeSubscriptionId: string;
        stripePriceId: string;
        plan: string;
        billingCycle: string;
        status: string;
        currentPeriodStart?: Date;
        currentPeriodEnd?: Date;
    }
): Promise<void> {
    await prisma.userSubscription.upsert({
        where: { userId },
        update: {
            ...data,
            updatedAt: new Date(),
        },
        create: {
            userId,
            ...data,
            scenarioCount: 0,
        },
    });
}
