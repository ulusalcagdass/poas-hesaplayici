import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "POAS Calculator | Measure True Ad Profitability",
    description: "Not ROAS, use POAS to measure the true profitability of your ads. Gross profit-based ad performance analysis.",
    keywords: ["POAS", "ROAS", "ad profitability", "e-commerce", "digital marketing", "gross profit"],
    openGraph: {
        title: "POAS Calculator | Measure True Ad Profitability",
        description: "Not ROAS, use POAS to measure the true profitability of your ads.",
        type: "website",
        locale: "en_US",
    },
};

export default function EnLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
