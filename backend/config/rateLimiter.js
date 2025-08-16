import { RateLimiterMemory } from "rate-limiter-flexible";

const points = Number(process.env.PASSWORD_RESET_RATE_LIMIT_POINTS || 5); // requests
const duration = Number(process.env.PASSWORD_RESET_RATE_LIMIT_DURATION || 300); // seconds

export const forgotPasswordLimiter = new RateLimiterMemory({ points, duration });

export async function rateLimitMiddleware(req, res, next) {
  try {
    const key = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    await forgotPasswordLimiter.consume(key);
    next();
  } catch {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }
}