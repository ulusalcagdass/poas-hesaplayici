import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Daily limits for free users
const DAILY_CALCULATION_LIMIT = 10;
const DAILY_PDF_EXPORT_LIMIT = 2;
const MAX_SCENARIOS = 5;

// Helper to check if date is today
function isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

// GET: Check current usage limits
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Giriş yapmanız gerekiyor' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { scenarios: true },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Kullanıcı bulunamadı' },
                { status: 404 }
            );
        }

        // Get or create usage record
        let usage = await prisma.userUsage.findUnique({
            where: { userId: user.id },
        });

        if (!usage) {
            usage = await prisma.userUsage.create({
                data: { userId: user.id },
            });
        }

        // Reset daily counters if not today
        if (!isToday(usage.lastResetDate)) {
            usage = await prisma.userUsage.update({
                where: { userId: user.id },
                data: {
                    calculationsToday: 0,
                    pdfExportsToday: 0,
                    lastResetDate: new Date(),
                },
            });
        }

        const scenarioCount = user.scenarios.length;

        return NextResponse.json({
            calculations: {
                used: usage.calculationsToday,
                limit: DAILY_CALCULATION_LIMIT,
                remaining: Math.max(0, DAILY_CALCULATION_LIMIT - usage.calculationsToday),
            },
            pdfExports: {
                used: usage.pdfExportsToday,
                limit: DAILY_PDF_EXPORT_LIMIT,
                remaining: Math.max(0, DAILY_PDF_EXPORT_LIMIT - usage.pdfExportsToday),
            },
            scenarios: {
                used: scenarioCount,
                limit: MAX_SCENARIOS,
                remaining: Math.max(0, MAX_SCENARIOS - scenarioCount),
            },
        });
    } catch (error) {
        console.error('Usage check error:', error);
        return NextResponse.json(
            { error: 'Kullanım bilgisi alınamadı' },
            { status: 500 }
        );
    }
}

// POST: Increment usage counter
export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Giriş yapmanız gerekiyor' },
                { status: 401 }
            );
        }

        const { type } = await request.json(); // 'calculation' or 'pdf'

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Kullanıcı bulunamadı' },
                { status: 404 }
            );
        }

        // Get or create usage record
        let usage = await prisma.userUsage.findUnique({
            where: { userId: user.id },
        });

        if (!usage) {
            usage = await prisma.userUsage.create({
                data: { userId: user.id },
            });
        }

        // Reset if not today
        if (!isToday(usage.lastResetDate)) {
            usage = await prisma.userUsage.update({
                where: { userId: user.id },
                data: {
                    calculationsToday: 0,
                    pdfExportsToday: 0,
                    lastResetDate: new Date(),
                },
            });
        }

        // Check limits
        if (type === 'calculation') {
            if (usage.calculationsToday >= DAILY_CALCULATION_LIMIT) {
                return NextResponse.json(
                    {
                        error: 'Günlük hesaplama limitine ulaştınız',
                        limitReached: true,
                        message: 'Günlük kullanım limitine ulaştınız, yarın tekrar deneyin.'
                    },
                    { status: 429 }
                );
            }

            await prisma.userUsage.update({
                where: { userId: user.id },
                data: { calculationsToday: usage.calculationsToday + 1 },
            });
        } else if (type === 'pdf') {
            if (usage.pdfExportsToday >= DAILY_PDF_EXPORT_LIMIT) {
                return NextResponse.json(
                    {
                        error: 'Günlük PDF export limitine ulaştınız',
                        limitReached: true,
                        message: 'Günlük kullanım limitine ulaştınız, yarın tekrar deneyin.'
                    },
                    { status: 429 }
                );
            }

            await prisma.userUsage.update({
                where: { userId: user.id },
                data: { pdfExportsToday: usage.pdfExportsToday + 1 },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Usage increment error:', error);
        return NextResponse.json(
            { error: 'Kullanım güncellenemedi' },
            { status: 500 }
        );
    }
}
