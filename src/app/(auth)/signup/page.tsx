'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Client-side validation
        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Bir hata oluştu');
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div
                className="glass-card"
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: '2.5rem',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(16, 185, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}
                >
                    <CheckCircle size={32} style={{ color: 'var(--color-success)' }} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Hesabınız Oluşturuldu!</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                    Giriş sayfasına yönlendiriliyorsunuz...
                </p>
                <div className="spinner" style={{ margin: '0 auto' }} />
            </div>
        );
    }

    return (
        <div
            className="glass-card"
            style={{
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem',
            }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-xl)',
                        background: 'var(--gradient-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                    }}
                >
                    <UserPlus size={28} color="white" />
                </div>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Ücretsiz Hesap Oluştur</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    POAS ile kârlılığınızı takip edin
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        color: 'var(--color-error)',
                        fontSize: '0.875rem',
                    }}
                >
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <label className="input-label" htmlFor="name">
                        Ad Soyad
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="input"
                        placeholder="Ahmet Yılmaz"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
                </div>

                {/* Email */}
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <label className="input-label" htmlFor="email">
                        E-posta
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="input"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>

                {/* Password */}
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <label className="input-label" htmlFor="password">
                        Şifre
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className="input"
                            style={{ paddingRight: '3rem' }}
                            placeholder="En az 6 karakter"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '0.75rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer',
                                padding: '0.25rem',
                            }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="input-label" htmlFor="confirmPassword">
                        Şifre Tekrar
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        className="input"
                        placeholder="Şifrenizi tekrar girin"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        opacity: isLoading ? 0.7 : 1,
                    }}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner" />
                            Hesap oluşturuluyor...
                        </>
                    ) : (
                        'Ücretsiz Üye Ol'
                    )}
                </button>
            </form>

            {/* Terms */}
            <p
                style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                }}
            >
                Üye olarak{' '}
                <a href="#" style={{ color: 'var(--color-primary-light)' }}>
                    Kullanım Şartları
                </a>{' '}
                ve{' '}
                <a href="#" style={{ color: 'var(--color-primary-light)' }}>
                    Gizlilik Politikası
                </a>
                &apos;nı kabul etmiş olursunuz.
            </p>

            {/* Login Link */}
            <p
                style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.9375rem',
                }}
            >
                Zaten hesabınız var mı?{' '}
                <Link
                    href="/login"
                    style={{
                        color: 'var(--color-primary-light)',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}
                >
                    Giriş Yap
                </Link>
            </p>
        </div>
    );
}
