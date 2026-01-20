import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

// Get locale from cookie, Accept-Language header, or default
function getLocale(request: NextRequest): string {
    // Check cookie first
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // Check Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
        const preferredLocale = acceptLanguage
            .split(',')
            .map((lang) => lang.split(';')[0].trim().substring(0, 2).toLowerCase())
            .find((lang) => locales.includes(lang));
        if (preferredLocale) {
            return preferredLocale;
        }
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip for API routes, static files, and Next.js internals
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.') ||
        pathname.startsWith('/review')
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        // Extract locale and set cookie
        const locale = pathname.split('/')[1];
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
        return response;
    }

    // Redirect to locale-prefixed path
    const locale = getLocale(request);
    const newUrl = request.nextUrl.clone();

    // Map routes for English
    if (locale === 'en') {
        if (pathname === '/hesaplayici') {
            newUrl.pathname = `/en/calculator`;
        } else if (pathname === '/senaryolar') {
            newUrl.pathname = `/en/scenarios`;
        } else {
            newUrl.pathname = `/en${pathname}`;
        }
    } else {
        newUrl.pathname = `/tr${pathname}`;
    }

    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
}

export const config = {
    matcher: [
        // Match all pathnames except:
        // - /api (API routes)
        // - /_next (Next.js internals)
        // - /favicon.ico, /robots.txt, etc.
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    ],
};
