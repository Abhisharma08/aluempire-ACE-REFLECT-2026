export class RateLimiter {
  private cache = new Map<string, { count: number; expiresAt: number }>();
  
  constructor(private windowMs: number, private maxRequests: number) {}

  check(ip: string): boolean {
    const now = Date.now();
    const record = this.cache.get(ip);
    
    // Clean up expired entries occasionally to prevent memory leak
    if (Math.random() < 0.1) {
      for (const [key, val] of this.cache.entries()) {
        if (now > val.expiresAt) {
          this.cache.delete(key);
        }
      }
    }

    if (!record || now > record.expiresAt) {
      this.cache.set(ip, { count: 1, expiresAt: now + this.windowMs });
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false; // Rate limit exceeded
    }

    record.count += 1;
    return true;
  }
}

// Global instances for rate limiting to preserve state across module reloads in dev
const globalForRateLimiter = global as unknown as {
  apiRateLimiter?: RateLimiter;
};

// 10 requests per minute per IP
export const apiRateLimiter = globalForRateLimiter.apiRateLimiter || new RateLimiter(60 * 1000, 10);

if (process.env.NODE_ENV !== "production") {
  globalForRateLimiter.apiRateLimiter = apiRateLimiter;
}
