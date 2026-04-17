import express from "express";
import passport from "passport";
import { register, login } from "./auth.controller.js";
import { validateRegister, validateLogin } from "./auth.validation.js";
import { generateToken } from "./auth.service.js";

const router = express.Router();

// Email/password auth
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Google OAuth
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const token = generateToken(req.user);
        res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
    }
);

export default router;