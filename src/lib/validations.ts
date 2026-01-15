import { z } from 'zod';

// Auth Schemas
export const signupSchema = z.object({
    name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
});

export const loginSchema = z.object({
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: z.string().min(1, 'Şifre gereklidir'),
});

// Calculator Schemas
export const calculatorInputSchema = z.object({
    revenue: z.number().min(0, 'Gelir negatif olamaz'),
    adSpend: z.number().min(0, 'Reklam harcaması negatif olamaz'),
    cogs: z.number().min(0, 'COGS negatif olamaz'),
    shippingCost: z.number().min(0, 'Kargo gideri negatif olamaz'),
    paymentFees: z.number().min(0, 'Ödeme komisyonu negatif olamaz'),
    handlingCost: z.number().min(0, 'Birim başı operasyon gideri negatif olamaz'),
    fixedCosts: z.number().min(0).optional(),
});

export const targetPoasSchema = z.object({
    targetPoas: z.number().min(0, 'Hedef POAS negatif olamaz'),
});

// Scenario Schemas
export const scenarioSchema = z.object({
    name: z.string().min(1, 'Senaryo adı gereklidir').max(100, 'Senaryo adı çok uzun'),
    channel: z.enum(['Google', 'Meta', 'TikTok', 'Diğer']),
    currency: z.string().default('TRY'),
    inputs: calculatorInputSchema,
    notes: z.string().max(500, 'Not çok uzun').optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CalculatorInput = z.infer<typeof calculatorInputSchema>;
export type TargetPoasInput = z.infer<typeof targetPoasSchema>;
export type ScenarioInput = z.infer<typeof scenarioSchema>;
