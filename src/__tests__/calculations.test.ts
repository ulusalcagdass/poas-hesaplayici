import { describe, it, expect } from 'vitest';
import {
    calculateVariableOrderCosts,
    calculateGrossProfit,
    calculatePOAS,
    calculateROAS,
    calculateContributionMargin,
    calculateNetProfit,
    calculateAll,
    calculateTargetPOAS,
    interpretPOAS,
    suggestDefaults,
} from '../lib/calculations';

describe('POAS Calculator - Core Calculations', () => {
    // Test 1: Temel POAS hesabı
    describe('calculatePOAS', () => {
        it('should calculate POAS correctly', () => {
            const grossProfit = 3500;
            const adSpend = 2000;
            const result = calculatePOAS(grossProfit, adSpend);
            expect(result).toBe(1.75);
        });

        it('should return Infinity when adSpend is 0 and grossProfit > 0', () => {
            const grossProfit = 1000;
            const adSpend = 0;
            const result = calculatePOAS(grossProfit, adSpend);
            expect(result).toBe(Infinity);
        });

        it('should return 0 when both grossProfit and adSpend are 0', () => {
            const result = calculatePOAS(0, 0);
            expect(result).toBe(0);
        });

        it('should handle negative gross profit', () => {
            const grossProfit = -500;
            const adSpend = 2000;
            const result = calculatePOAS(grossProfit, adSpend);
            expect(result).toBe(-0.25);
        });
    });

    // Test 2: Değişken maliyet hesabı
    describe('calculateVariableOrderCosts', () => {
        it('should sum all variable costs correctly', () => {
            const result = calculateVariableOrderCosts(4000, 1500, 500, 500);
            expect(result).toBe(6500);
        });

        it('should handle zero values', () => {
            const result = calculateVariableOrderCosts(0, 0, 0, 0);
            expect(result).toBe(0);
        });
    });

    // Test 3: Brüt kâr hesabı
    describe('calculateGrossProfit', () => {
        it('should calculate gross profit correctly', () => {
            const revenue = 10000;
            const variableOrderCosts = 6500;
            const result = calculateGrossProfit(revenue, variableOrderCosts);
            expect(result).toBe(3500);
        });

        it('should return negative when costs exceed revenue', () => {
            const revenue = 5000;
            const variableOrderCosts = 7000;
            const result = calculateGrossProfit(revenue, variableOrderCosts);
            expect(result).toBe(-2000);
        });
    });

    // Test 4: Katkı marjı hesabı
    describe('calculateContributionMargin', () => {
        it('should calculate contribution margin correctly', () => {
            const grossProfit = 3500;
            const adSpend = 2000;
            const result = calculateContributionMargin(grossProfit, adSpend);
            expect(result).toBe(1500);
        });

        it('should return negative when adSpend exceeds grossProfit', () => {
            const grossProfit = 1000;
            const adSpend = 2000;
            const result = calculateContributionMargin(grossProfit, adSpend);
            expect(result).toBe(-1000);
        });
    });

    // Test 5: Net kâr hesabı
    describe('calculateNetProfit', () => {
        it('should calculate net profit correctly', () => {
            const contributionMargin = 1500;
            const fixedCosts = 500;
            const result = calculateNetProfit(contributionMargin, fixedCosts);
            expect(result).toBe(1000);
        });
    });

    // Test 6: ROAS hesabı (karşılaştırma için)
    describe('calculateROAS', () => {
        it('should calculate ROAS correctly', () => {
            const revenue = 10000;
            const adSpend = 2000;
            const result = calculateROAS(revenue, adSpend);
            expect(result).toBe(5);
        });
    });

    // Test 7: Hedef POAS hesabı
    describe('calculateTargetPOAS', () => {
        it('should calculate max ad spend for target POAS', () => {
            const result = calculateTargetPOAS({
                grossProfit: 3500,
                adSpend: 2000,
                targetPoas: 2,
            });
            expect(result.maxAdSpend).toBe(1750);
        });

        it('should calculate min gross profit for target POAS', () => {
            const result = calculateTargetPOAS({
                grossProfit: 3500,
                adSpend: 2000,
                targetPoas: 2,
            });
            expect(result.minGrossProfit).toBe(4000);
        });

        it('should handle target POAS of 0', () => {
            const result = calculateTargetPOAS({
                grossProfit: 3500,
                adSpend: 2000,
                targetPoas: 0,
            });
            expect(result.maxAdSpend).toBe(0);
            expect(result.minGrossProfit).toBe(0);
        });
    });

    // Test 8: Tam hesaplama (calculateAll)
    describe('calculateAll', () => {
        it('should calculate all outputs correctly', () => {
            const inputs = {
                revenue: 10000,
                adSpend: 2000,
                cogs: 4000,
                shippingCost: 1500,
                paymentFees: 500,
                handlingCost: 500,
            };

            const result = calculateAll(inputs);

            expect(result.variableOrderCosts).toBe(6500);
            expect(result.grossProfit).toBe(3500);
            expect(result.poas).toBe(1.75);
            expect(result.poasPercentage).toBe(175);
            expect(result.contributionMargin).toBe(1500);
            expect(result.roas).toBe(5);
            expect(result.netProfit).toBeNull();
        });

        it('should calculate net profit when fixedCosts is provided', () => {
            const inputs = {
                revenue: 10000,
                adSpend: 2000,
                cogs: 4000,
                shippingCost: 1500,
                paymentFees: 500,
                handlingCost: 500,
                fixedCosts: 500,
            };

            const result = calculateAll(inputs);
            expect(result.netProfit).toBe(1000);
        });
    });

    // Test 9: POAS yorumlama
    describe('interpretPOAS', () => {
        it('should return excellent for POAS >= 2', () => {
            const result = interpretPOAS(2.5);
            expect(result.status).toBe('excellent');
        });

        it('should return good for POAS >= 1.4', () => {
            const result = interpretPOAS(1.5);
            expect(result.status).toBe('good');
        });

        it('should return warning for POAS >= 1', () => {
            const result = interpretPOAS(1.1);
            expect(result.status).toBe('warning');
        });

        it('should return critical for POAS < 1', () => {
            const result = interpretPOAS(0.8);
            expect(result.status).toBe('critical');
        });
    });

    // Test 10: Varsayılan değer önerileri
    describe('suggestDefaults', () => {
        it('should suggest defaults based on revenue', () => {
            const result = suggestDefaults(10000);
            expect(result.cogs).toBe(4000); // 40% of revenue
            expect(result.paymentFees).toBe(200); // 2% of revenue
            expect(result.shippingCost).toBe(30);
            expect(result.handlingCost).toBe(5);
        });

        it('should multiply per-order costs by order count', () => {
            const result = suggestDefaults(10000, 10);
            expect(result.shippingCost).toBe(300); // 30 * 10
            expect(result.handlingCost).toBe(50); // 5 * 10
        });
    });
});
