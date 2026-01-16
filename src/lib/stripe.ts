import Stripe from 'stripe';

// Lazy initialization to avoid build failures when env vars not set
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
    if (!stripeInstance) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            throw new Error('STRIPE_SECRET_KEY is not set. Please configure Stripe in Render environment variables.');
        }
        stripeInstance = new Stripe(secretKey, {
            apiVersion: '2025-12-15.clover',
            typescript: true,
        });
    }
    return stripeInstance;
}

// For backward compatibility
export const stripe = {
    get checkout() { return getStripe().checkout; },
    get subscriptions() { return getStripe().subscriptions; },
    get webhooks() { return getStripe().webhooks; },
    get customers() { return getStripe().customers; },
};

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
