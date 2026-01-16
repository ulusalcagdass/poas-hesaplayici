import Link from 'next/link';
import { Calculator, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const footerLinks = {
        product: [
            { label: 'Özellikler', href: '#features' },
            { label: 'Nasıl Çalışır', href: '#how-it-works' },
            { label: 'SSS', href: '#faq' },
            { label: 'Hesaplayıcı', href: '/hesaplayici' },
        ],
        resources: [
            { label: 'POAS Rehberi', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Yardım Merkezi', href: '#' },
        ],
        company: [
            { label: 'Hakkımızda', href: '#' },
            { label: 'İletişim', href: '#' },
            { label: 'Gizlilik Politikası', href: '#' },
            { label: 'Kullanım Şartları', href: '#' },
        ],
    };

    return (
        <footer
            style={{
                background: 'var(--color-bg-secondary)',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '4rem',
                paddingBottom: '2rem',
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '3rem',
                        marginBottom: '3rem',
                    }}
                >
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none',
                                color: 'var(--color-text-primary)',
                                fontWeight: 700,
                                fontSize: '1.25rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'var(--gradient-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Calculator size={20} />
                            </div>
                            <span>POAS</span>
                            <span style={{ color: 'var(--color-primary-light)' }}>Hesaplayıcı</span>
                        </Link>
                        <p
                            style={{
                                color: 'var(--color-text-muted)',
                                fontSize: '0.9375rem',
                                lineHeight: 1.6,
                                maxWidth: '280px',
                            }}
                        >
                            ROAS değil, POAS ile reklamlarınızın gerçek kârlılığını ölçün.
                        </p>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <a
                                href="#"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--color-surface)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-muted)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="#"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--color-surface)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-muted)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="#"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--color-surface)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-muted)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Ürün
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.product.map((link, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <a
                                        href={link.href}
                                        style={{
                                            color: 'var(--color-text-muted)',
                                            textDecoration: 'none',
                                            fontSize: '0.9375rem',
                                            transition: 'color 0.2s ease',
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Kaynaklar
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.resources.map((link, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <a
                                        href={link.href}
                                        style={{
                                            color: 'var(--color-text-muted)',
                                            textDecoration: 'none',
                                            fontSize: '0.9375rem',
                                            transition: 'color 0.2s ease',
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            Şirket
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {footerLinks.company.map((link, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <a
                                        href={link.href}
                                        style={{
                                            color: 'var(--color-text-muted)',
                                            textDecoration: 'none',
                                            fontSize: '0.9375rem',
                                            transition: 'color 0.2s ease',
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    style={{
                        paddingTop: '2rem',
                        borderTop: '1px solid var(--color-border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}
                >
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        © {new Date().getFullYear()} POAS Hesaplayıcı. Tüm hakları saklıdır.
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        Made with 💜 in Türkiye
                    </p>
                </div>
            </div>
        </footer>
    );
}
