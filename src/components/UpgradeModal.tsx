'use client';

import { useState } from 'react';
import { X, Check, Sparkles, Lock } from 'lucide-react';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    reason?: 'subscription_required' | 'scenario_limit_reached';
}

const PLANS = [
    {
        id: 'solo',
        name: 'Solo',
        price: 499,
        tagline: 'Tek marka için hızlı kârlılık kontrolü.',
        features: ['30 senaryo/ay', 'PDF export', 'Temel hedef POAS'],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 999,
        tagline: 'Büyüme ve ekip kullanımı için ideal.',
        features: ['Sınırsız senaryo', 'CSV + PDF export', 'Gelişmiş özellikler'],
        popular: true,
    },
    {
        id: 'agency',
        name: 'Ajans',
        price: 2499,
        tagline: 'Ajanslar için müşteri bazlı raporlama.',
        features: ['10 kullanıcı', 'White-label rapor', 'Öncelikli destek'],
    },
];

export default function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
    const [selectedPlan, setSelectedPlan] = useState<string>('pro');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleUpgrade = async () => {
        if (!selectedPlan) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: selectedPlan, billingCycle }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="glass-card"
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    padding: '2rem',
                    position: 'relative',
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        padding: '0.5rem',
                    }}
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'rgba(99, 102, 241, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                        }}
                    >
                        <Lock size={28} style={{ color: 'var(--color-primary-light)' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {reason === 'scenario_limit_reached'
                            ? 'Senaryo Limitine Ulaştınız'
                            : 'Plan Seçmeniz Gerekiyor'}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
                        {reason === 'scenario_limit_reached'
                            ? 'Bu ay için senaryo limitinizi doldurdunuz. Daha fazla hesaplama için planınızı yükseltin.'
                            : 'POAS hesaplamaları yapmak için bir plan seçin.'}
                    </p>
                </div>

                {/* Billing Toggle */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-full)',
                            padding: '4px',
                        }}
                    >
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                background: billingCycle === 'monthly' ? 'var(--color-primary)' : 'transparent',
                                color: billingCycle === 'monthly' ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                            }}
                        >
                            Aylık
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                background: billingCycle === 'yearly' ? 'var(--color-primary)' : 'transparent',
                                color: billingCycle === 'yearly' ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                            }}
                        >
                            Yıllık (-15%)
                        </button>
                    </div>
                </div>

                {/* Plan Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {PLANS.map((plan) => {
                        const monthlyPrice = billingCycle === 'yearly'
                            ? Math.round(plan.price * 0.85)
                            : plan.price;

                        return (
                            <button
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: selectedPlan === plan.id
                                        ? '2px solid var(--color-primary)'
                                        : '1px solid var(--color-border)',
                                    background: selectedPlan === plan.id
                                        ? 'rgba(99, 102, 241, 0.1)'
                                        : 'var(--color-surface)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    position: 'relative',
                                }}
                            >
                                {/* Radio indicator */}
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: selectedPlan === plan.id
                                            ? '6px solid var(--color-primary)'
                                            : '2px solid var(--color-border)',
                                        background: 'transparent',
                                        flexShrink: 0,
                                    }}
                                />

                                {/* Plan info */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                            {plan.name}
                                        </span>
                                        {plan.popular && (
                                            <span
                                                style={{
                                                    fontSize: '0.625rem',
                                                    padding: '2px 6px',
                                                    background: 'var(--gradient-primary)',
                                                    borderRadius: 'var(--radius-full)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Popüler
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                                        {plan.features.join(' • ')}
                                    </div>
                                </div>

                                {/* Price */}
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text-primary)' }}>
                                        ₺{monthlyPrice.toLocaleString('tr-TR')}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/ay</div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <button
                    onClick={handleUpgrade}
                    disabled={isLoading || !selectedPlan}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <Sparkles size={18} />
                    {isLoading ? 'Yönlendiriliyor...' : 'Planı Seç ve Devam Et'}
                </button>

                {/* Trust note */}
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                    Güvenli ödeme • İstediğin zaman iptal et
                </p>
            </div>
        </div>
    );
}
