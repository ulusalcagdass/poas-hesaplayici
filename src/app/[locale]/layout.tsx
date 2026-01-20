import type { Metadata } from "next";
import "../globals.css";
import Providers from "@/components/Providers";

type Locale = 'tr' | 'en';

export async function generateStaticParams() {
    return [{ locale: 'tr' }, { locale: 'en' }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    if (locale === 'en') {
        return {
            title: "POAS Calculator | Measure True Ad Profitability",
            description: "Not ROAS, use POAS to measure the true profitability of your ads. Gross profit-based ad performance analysis, scenario saving, and reporting.",
            keywords: ["POAS", "ROAS", "ad profitability", "e-commerce", "digital marketing", "gross profit"],
            authors: [{ name: "POAS Calculator" }],
            openGraph: {
                title: "POAS Calculator | Measure True Ad Profitability",
                description: "Not ROAS, use POAS to measure the true profitability of your ads.",
                type: "website",
                locale: "en_US",
            },
            alternates: {
                languages: {
                    'tr': '/',
                    'en': '/en',
                },
            },
        };
    }

    return {
        title: "POAS Hesaplayıcı | Gerçek Reklam Kârlılığını Ölç",
        description: "ROAS değil, POAS ile reklamlarınızın gerçek kârlılığını ölçün. Brüt kâr bazlı reklam performansı analizi, senaryo kaydetme ve raporlama.",
        keywords: ["POAS", "ROAS", "reklam kârlılığı", "e-ticaret", "dijital pazarlama", "brüt kâr"],
        authors: [{ name: "POAS Hesaplayıcı" }],
        openGraph: {
            title: "POAS Hesaplayıcı | Gerçek Reklam Kârlılığını Ölç",
            description: "ROAS değil, POAS ile reklamlarınızın gerçek kârlılığını ölçün.",
            type: "website",
            locale: "tr_TR",
        },
        alternates: {
            languages: {
                'tr': '/',
                'en': '/en',
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <html lang={locale === 'en' ? 'en' : 'tr'}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                {/* hreflang tags for SEO */}
                <link rel="alternate" hrefLang="tr" href="https://poas-hesaplayici.onrender.com/tr" />
                <link rel="alternate" hrefLang="en" href="https://poas-hesaplayici.onrender.com/en" />
                <link rel="alternate" hrefLang="x-default" href="https://poas-hesaplayici.onrender.com/tr" />
            </head>
            <body>
                <Providers initialLocale={locale as Locale}>{children}</Providers>
            </body>
        </html>
    );
}
