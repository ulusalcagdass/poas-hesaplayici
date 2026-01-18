import MobileMenu from '@/components/dashboard/MobileMenu';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                background: 'var(--color-bg)',
            }}
        >
            {/* Sidebar */}
            <DashboardSidebar />

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
                <MobileMenu />

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
