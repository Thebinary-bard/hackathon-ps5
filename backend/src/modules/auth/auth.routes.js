import express from "express";
import passport from "passport";
import { register, login } from "./auth.controller.js";
import { validateRegister, validateLogin } from "./auth.validation.js";
import { generateToken } from "./auth.service.js";
import { GOOGLE_OAUTH_ENABLED } from "../../config/oauth.js";
import { env } from "../../config/env.js";


const router = express.Router();

// Email/password auth
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Google OAuth — only register if credentials are configured
if (GOOGLE_OAUTH_ENABLED) {
    router.get(
        "/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    router.get(
        "/google/callback",
        passport.authenticate("google", { session: false, failureRedirect: "/" }),
        (req, res) => {
            const token = generateToken(req.user);
            const base = String(env.frontendUrl || "").replace(/\/+$/, "");
            res.redirect(`${base}/oauth-success?token=${encodeURIComponent(token)}`);
        }
    );
} else {
    router.get("/google", (req, res) => {
        res.status(503).json({ success: false, message: "Google OAuth not configured" });
    });
}

export default router;