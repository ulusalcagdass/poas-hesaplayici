import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create demo user
    const passwordHash = await bcrypt.hash('demo1234', 10);

    const demoUser = await prisma.user.upsert({
        where: { email: 'demo@poas.app' },
        update: {},
        create: {
            email: 'demo@poas.app',
            name: 'Demo Kullanıcı',
            passwordHash,
        },
    });

    console.log('✅ Demo user created:', demoUser.email);

    // Create sample scenarios
    const scenario1Inputs = {
        revenue: 50000,
        adSpend: 10000,
        cogs: 20000,
        shippingCost: 5000,
        paymentFees: 1000,
        handlingCost: 500,
    };

    const scenario1Outputs = {
        variableOrderCosts: 26500,
        grossProfit: 23500,
        poas: 2.35,
        poasPercentage: 235,
        contributionMargin: 13500,
        netProfit: null,
        roas: 5,
    };

    const scenario1 = await prisma.scenario.create({
        data: {
            userId: demoUser.id,
            name: 'Google Ads - E-ticaret Kampanyası',
            channel: 'Google',
            currency: 'TRY',
            inputs: JSON.stringify(scenario1Inputs),
            outputs: JSON.stringify(scenario1Outputs),
            notes: 'Kasım ayı Search + Shopping kampanyası. POAS 2.35 ile mükemmel performans.',
        },
    });

    console.log('✅ Scenario 1 created:', scenario1.name);

    const scenario2Inputs = {
        revenue: 100000,
        adSpend: 30000,
        cogs: 40000,
        shippingCost: 12000,
        paymentFees: 2500,
        handlingCost: 2000,
    };

    const scenario2Outputs = {
        variableOrderCosts: 56500,
        grossProfit: 43500,
        poas: 1.45,
        poasPercentage: 145,
        contributionMargin: 13500,
        netProfit: null,
        roas: 3.33,
    };

    const scenario2 = await prisma.scenario.create({
        data: {
            userId: demoUser.id,
            name: 'Meta Ads - Black Friday Promosyonu',
            channel: 'Meta',
            currency: 'TRY',
            inputs: JSON.stringify(scenario2Inputs),
            outputs: JSON.stringify(scenario2Outputs),
            notes: 'Black Friday kampanyası. Yüksek indirimler nedeniyle POAS 1.45 seviyesinde. Kontrollü büyüme hedefine uygun.',
        },
    });

    console.log('✅ Scenario 2 created:', scenario2.name);

    // Create Pro subscription for demo user
    const subscription = await prisma.userSubscription.upsert({
        where: { userId: demoUser.id },
        update: {
            plan: 'pro',
            billingCycle: 'monthly',
            status: 'active',
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
        create: {
            userId: demoUser.id,
            plan: 'pro',
            billingCycle: 'monthly',
            status: 'active',
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            scenarioCount: 0,
        },
    });

    console.log('✅ Pro subscription created for demo user');

    console.log('');
    console.log('🎉 Seeding completed!');
    console.log('');
    console.log('Demo hesabı (PRO ABONELİKLİ):');
    console.log('  Email: demo@poas.app');
    console.log('  Şifre: demo1234');
    console.log('  Plan: Pro (Aktif)');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
