import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, getPlanFromPriceId } from '@/lib/stripe';
import { createOrUpdateSubscription } from '@/lib/subscription';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(request: Request) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET is not set');
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.userId;
                const plan = session.metadata?.plan;
                const billingCycle = session.metadata?.billingCycle;

                if (!userId || !plan || !billingCycle) {
                    console.error('Missing metadata in checkout session');
                    break;
                }

                // Get subscription details
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                await createOrUpdateSubscription(userId, {
                    stripeCustomerId: session.customer as string,
                    stripeSubscriptionId: subscription.id,
                    stripePriceId: subscription.items.data[0]?.price.id || '',
                    plan,
                    billingCycle,
                    status: 'active',
                    currentPeriodStart: new Date(subscription.current_period_start * 1000),
                    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                });

                console.log(`Subscription created for user ${userId}: ${plan}/${billingCycle}`);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata?.userId;

                if (!userId) {
                    // Try to find user by customer ID
                    const userSub = await prisma.userSubscription.findFirst({
                        where: { stripeCustomerId: subscription.customer as string },
                    });
                    if (!userSub) {
                        console.error('Could not find user for subscription update');
                        break;
                    }
                }

                const priceId = subscription.items.data[0]?.price.id;
                const planInfo = priceId ? getPlanFromPriceId(priceId) : null;

                await prisma.userSubscription.updateMany({
                    where: {
                        OR: [
                            { stripeSubscriptionId: subscription.id },
                            { stripeCustomerId: subscription.customer as string },
                        ],
                    },
                    data: {
                        status: subscription.status === 'active' ? 'active' : subscription.status,
                        stripePriceId: priceId || undefined,
                        plan: planInfo?.planId || undefined,
                        billingCycle: planInfo?.billingCycle || undefined,
                        currentPeriodStart: new Date(subscription.current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        updatedAt: new Date(),
                    },
                });

                console.log(`Subscription updated: ${subscription.id}`);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;

                await prisma.userSubscription.updateMany({
                    where: {
                        stripeSubscriptionId: subscription.id,
                    },
                    data: {
                        status: 'canceled',
                        updatedAt: new Date(),
                    },
                });

                console.log(`Subscription canceled: ${subscription.id}`);
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;

                await prisma.userSubscription.updateMany({
                    where: {
                        stripeCustomerId: invoice.customer as string,
                    },
                    data: {
                        status: 'past_due',
                        updatedAt: new Date(),
                    },
                });

                console.log(`Payment failed for customer: ${invoice.customer}`);
                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook handler error:', error);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}
