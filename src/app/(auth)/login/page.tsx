'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/hesaplayici';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('E-posta veya şifre hatalı');
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

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
                    <LogIn size={28} color="white" />
                </div>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Hoş Geldiniz</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    POAS Hesaplayıcı ücretsizdir. Sonuçları görmek için giriş yapın.
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
                {/* Email */}
                <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <label className="input-label" htmlFor="email">
                        E-posta
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="input"
                        placeholder="ornek@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                {/* Password */}
                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="input-label" htmlFor="password">
                        Şifre
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className="input"
                            style={{ paddingRight: '3rem' }}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
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
                            Giriş yapılıyor...
                        </>
                    ) : (
                        'Giriş Yap'
                    )}
                </button>
            </form>

            {/* Forgot Password */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <a
                    href="#"
                    style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                    }}
                >
                    Şifremi Unuttum
                </a>
            </div>

            {/* Sign Up Link */}
            <p
                style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.9375rem',
                }}
            >
                Hesabınız yok mu?{' '}
                <Link
                    href="/signup"
                    style={{
                        color: 'var(--color-primary-light)',
                        textDecoration: 'none',
                        fontWeight: 600,
                    }}
                >
                    Ücretsiz Üye Ol
                </Link>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="spinner" style={{ margin: '2rem auto' }} />}>
            <LoginForm />
        </Suspense>
    );
}
