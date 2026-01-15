import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--color-bg)',
            }}
        >
            {/* Simple Header */}
            <header
                style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: 'var(--color-text-primary)',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Calculator size={18} />
                    </div>
                    <span>POAS</span>
                    <span style={{ color: 'var(--color-primary-light)' }}>Hesaplayıcı</span>
                </Link>
            </header>

            {/* Content */}
            <main
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem 1.5rem',
                }}
            >
                {children}
            </main>

            {/* Simple Footer */}
            <footer
                style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid var(--color-border)',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.875rem',
                }}
            >
                © {new Date().getFullYear()} POAS Hesaplayıcı
            </footer>
        </div>
    );
}
