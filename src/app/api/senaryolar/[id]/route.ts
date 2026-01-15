import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Get single scenario
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Yetkisiz erişim' },
                { status: 401 }
            );
        }

        const { id } = await params;

        const scenario = await prisma.scenario.findUnique({
            where: { id },
        });

        if (!scenario) {
            return NextResponse.json(
                { error: 'Senaryo bulunamadı' },
                { status: 404 }
            );
        }

        if (scenario.userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Yetkisiz erişim' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            ...scenario,
            inputs: JSON.parse(scenario.inputs),
            outputs: JSON.parse(scenario.outputs),
        });
    } catch (error) {
        console.error('Error fetching scenario:', error);
        return NextResponse.json(
            { error: 'Senaryo yüklenirken bir hata oluştu' },
            { status: 500 }
        );
    }
}

// DELETE - Delete scenario
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Yetkisiz erişim' },
                { status: 401 }
            );
        }

        const { id } = await params;

        const scenario = await prisma.scenario.findUnique({
            where: { id },
        });

        if (!scenario) {
            return NextResponse.json(
                { error: 'Senaryo bulunamadı' },
                { status: 404 }
            );
        }

        if (scenario.userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Yetkisiz erişim' },
                { status: 403 }
            );
        }

        await prisma.scenario.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Senaryo silindi' });
    } catch (error) {
        console.error('Error deleting scenario:', error);
        return NextResponse.json(
            { error: 'Senaryo silinirken bir hata oluştu' },
            { status: 500 }
        );
    }
}
