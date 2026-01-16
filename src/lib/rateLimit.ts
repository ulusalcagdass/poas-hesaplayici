/**
 * Simple In-Memory Rate Limiter
 * 
 * Basic rate limiting for API endpoints.
 * In production, use Redis or a dedicated rate limiting service.
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of rateLimitStore.entries()) {
            if (entry.resetTime < now) {
                rateLimitStore.delete(key);
            }
        }
    }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
    /** Maximum number of requests allowed in the window */
    maxRequests: number;
    /** Time window in milliseconds */
    windowMs: number;
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetTime: number;
}

/**
 * Check if a request should be rate limited
 * @param key - Unique identifier for the rate limit (e.g., user ID or IP)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    if (!entry || entry.resetTime < now) {
        // Create new entry
        const newEntry: RateLimitEntry = {
            count: 1,
            resetTime: now + config.windowMs,
        };
        rateLimitStore.set(key, newEntry);
        return {
            success: true,
            remaining: config.maxRequests - 1,
            resetTime: newEntry.resetTime,
        };
    }

    if (entry.count >= config.maxRequests) {
        return {
            success: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(key, entry);

    return {
        success: true,
        remaining: config.maxRequests - entry.count,
        resetTime: entry.resetTime,
    };
}

// Default rate limit configs
export const RATE_LIMITS = {
    /** API endpoints: 100 requests per minute per user */
    API: { maxRequests: 100, windowMs: 60 * 1000 },
    /** Scenario save: 10 per minute per user */
    SCENARIO_SAVE: { maxRequests: 10, windowMs: 60 * 1000 },
    /** Auth attempts: 5 per minute per IP */
    AUTH: { maxRequests: 5, windowMs: 60 * 1000 },
};
