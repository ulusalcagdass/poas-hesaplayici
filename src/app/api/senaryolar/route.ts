import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { scenarioSchema } from '@/lib/validations';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rateLimit';

// GET - List scenarios
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Yetkisiz erişim' },
                { status: 401 }
            );
        }

        // Rate limit check
        const rateLimitResult = checkRateLimit(`api:${session.user.id}`, RATE_LIMITS.API);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Çok fazla istek. Lütfen bekleyin.' },
                { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)) } }
            );
        }

        const scenarios = await prisma.scenario.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
        });

        // Parse JSON strings back to objects
        const parsedScenarios = scenarios.map((scenario: { id: string; inputs: string; outputs: string; userId: string; name: string; channel: string; currency: string; notes: string | null; createdAt: Date; updatedAt: Date }) => ({
            ...scenario,
            inputs: JSON.parse(scenario.inputs),
            outputs: JSON.parse(scenario.outputs),
        }));

        return NextResponse.json(parsedScenarios);
    } catch (error) {
        console.error('Error fetching scenarios:', error);
        return NextResponse.json(
            { error: 'Senaryolar yüklenirken bir hata oluştu' },
            { status: 500 }
        );
    }
}

// POST - Create scenario
export async function POST(request: Request) {
    try {
        const session = await auth();

        // ✅ userId sadece server session'dan alınıyor - güvenli
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Yetkisiz erişim' },
                { status: 401 }
            );
        }

        // ✅ Rate limit check
        const rateLimitResult = checkRateLimit(`scenario:${session.user.id}`, RATE_LIMITS.SCENARIO_SAVE);
        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: 'Çok fazla senaryo kaydı. Lütfen bekleyin.' },
                { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)) } }
            );
        }

        const body = await request.json();

        // Validate input
        const result = scenarioSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, channel, currency, inputs, notes } = result.data;
        const outputs = body.outputs;

        const scenario = await prisma.scenario.create({
            data: {
                userId: session.user.id,
                name,
                channel,
                currency,
                inputs: JSON.stringify(inputs),
                outputs: JSON.stringify(outputs),
                notes,
            },
        });

        return NextResponse.json(
            {
                message: 'Senaryo başarıyla kaydedildi',
                scenario: {
                    ...scenario,
                    inputs: JSON.parse(scenario.inputs),
                    outputs: JSON.parse(scenario.outputs),
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating scenario:', error);
        return NextResponse.json(
            { error: 'Senaryo kaydedilirken bir hata oluştu' },
            { status: 500 }
        );
    }
}
