import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSubscription } from '@/lib/subscription';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const subscription = await getSubscription(session.user.id);

        return NextResponse.json(subscription);
    } catch (error) {
        console.error('Subscription check error:', error);
        return NextResponse.json(
            { error: 'Failed to check subscription' },
            { status: 500 }
        );
    }
}
