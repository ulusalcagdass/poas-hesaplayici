import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getStripe, getPriceId, PlanId } from '@/lib/stripe';

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { plan, billingCycle } = body as { plan: PlanId; billingCycle: 'monthly' | 'yearly' };

        if (!plan || !billingCycle) {
            return NextResponse.json({ error: 'Missing plan or billingCycle' }, { status: 400 });
        }

        const priceId = getPriceId(plan, billingCycle);

        if (!priceId) {
            return NextResponse.json({ error: 'Invalid plan configuration' }, { status: 500 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        const checkoutSession = await getStripe().checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${appUrl}/hesaplayici?success=true&plan=${plan}`,
            cancel_url: `${appUrl}/hesaplayici?canceled=true`,
            customer_email: session.user.email || undefined,
            metadata: {
                userId: session.user.id,
                plan,
                billingCycle,
            },
            subscription_data: {
                metadata: {
                    userId: session.user.id,
                    plan,
                    billingCycle,
                },
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
