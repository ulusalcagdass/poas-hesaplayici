import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "POAS Calculator | Measure True Ad Profitability",
    description: "Calculate your true ad profitability with POAS. Stop relying on misleading ROAS metrics.",
    keywords: ["POAS calculator", "ROAS", "ad profitability", "e-commerce calculator", "digital marketing"],
    openGraph: {
        title: "POAS Calculator | Calculate True Profitability",
        description: "Calculate your true ad profitability with POAS.",
        type: "website",
        locale: "en_US",
    },
};

export default function CalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
