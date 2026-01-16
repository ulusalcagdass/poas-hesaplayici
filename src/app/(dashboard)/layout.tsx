import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';
import { Calculator, FileText, LogOut, User } from 'lucide-react';
import MobileMenu from '@/components/dashboard/MobileMenu';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                background: 'var(--color-bg)',
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: '260px',
                    background: 'var(--color-bg-secondary)',
                    borderRight: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 40,
                }}
                className="sidebar"
            >
                {/* Logo */}
                <div
                    style={{
                        padding: '1.25rem 1.5rem',
                        borderBottom: '1px solid var(--color-border)',
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: 'flex',
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
                        <span style={{ color: 'var(--color-primary-light)' }}>Hesap</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '1rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <span
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'var(--color-text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                padding: '0 0.75rem',
                            }}
                        >
                            Ana Menü
                        </span>
                    </div>

                    <Link
                        href="/hesaplayici"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            fontSize: '0.9375rem',
                            transition: 'all 0.2s ease',
                            marginBottom: '0.25rem',
                        }}
                        className="nav-link"
                    >
                        <Calculator size={20} />
                        Hesaplayıcı
                    </Link>

                    <Link
                        href="/senaryolar"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            fontSize: '0.9375rem',
                            transition: 'all 0.2s ease',
                        }}
                        className="nav-link"
                    >
                        <FileText size={20} />
                        Senaryolarım
                    </Link>
                </nav>

                {/* User Section */}
                <div
                    style={{
                        padding: '1rem',
                        borderTop: '1px solid var(--color-border)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '0.75rem',
                        }}
                    >
                        <div
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <User size={18} />
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div
                                style={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {session.user.name || 'Kullanıcı'}
                            </div>
                            <div
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {session.user.email}
                            </div>
                        </div>
                    </div>

                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/' });
                        }}
                    >
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '0.625rem',
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-muted)',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <LogOut size={16} />
                            Çıkış Yap
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    marginLeft: '260px',
                    minHeight: '100vh',
                    width: 'calc(100% - 260px)',
                    maxWidth: '100%',
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                }}
                className="main-content"
            >
                {/* Mobile Menu - Client Component */}
                <MobileMenu userName={session.user.name || null} userEmail={session.user.email || null} />

                {/* Page Content */}
                <div
                    className="page-content"
                    style={{
                        padding: '1.5rem',
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                    }}
                >
                    {children}
                </div>
            </main>
        </div>
    );
}
