import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-11-20.acacia',
    typescript: true,
});

// Plan configuration
export const PLANS = {
    solo: {
        name: 'Solo',
        monthlyPriceId: process.env.STRIPE_PRICE_SOLO_MONTHLY || '',
        yearlyPriceId: process.env.STRIPE_PRICE_SOLO_YEARLY || '',
        scenarioLimit: 30, // per month
        userLimit: 1,
    },
    pro: {
        name: 'Pro',
        monthlyPriceId: process.env.STRIPE_PRICE_PRO_MONTHLY || '',
        yearlyPriceId: process.env.STRIPE_PRICE_PRO_YEARLY || '',
        scenarioLimit: null, // unlimited
        userLimit: 3,
    },
    agency: {
        name: 'Agency',
        monthlyPriceId: process.env.STRIPE_PRICE_AGENCY_MONTHLY || '',
        yearlyPriceId: process.env.STRIPE_PRICE_AGENCY_YEARLY || '',
        scenarioLimit: null, // unlimited
        userLimit: 10,
    },
} as const;

export type PlanId = keyof typeof PLANS;

export function getPriceId(planId: PlanId, billingCycle: 'monthly' | 'yearly'): string {
    const plan = PLANS[planId];
    return billingCycle === 'yearly' ? plan.yearlyPriceId : plan.monthlyPriceId;
}

export function getPlanFromPriceId(priceId: string): { planId: PlanId; billingCycle: 'monthly' | 'yearly' } | null {
    for (const [planId, plan] of Object.entries(PLANS)) {
        if (plan.monthlyPriceId === priceId) {
            return { planId: planId as PlanId, billingCycle: 'monthly' };
        }
        if (plan.yearlyPriceId === priceId) {
            return { planId: planId as PlanId, billingCycle: 'yearly' };
        }
    }
    return null;
}
