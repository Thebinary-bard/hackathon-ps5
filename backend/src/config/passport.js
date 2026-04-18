import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../modules/users/user.model.js";
import { GOOGLE_CONFIG } from "./oauth.js";

// 🔐 Only register Google OAuth strategy if credentials are configured
if (GOOGLE_CONFIG.clientID && GOOGLE_CONFIG.clientSecret) {
    passport.use(
        new GoogleStrategy(
            GOOGLE_CONFIG,
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails[0].value;

                    let user = await User.findOne({ email });

                    if (!user) {
                        user = await User.create({
                            name: profile.displayName,
                            email,
                            password: "oauth", // dummy
                            role: "student",
                        });
                    }

                    done(null, user);
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );
    console.log("✅ Google OAuth strategy registered");
} else {
    console.warn("⚠️  Google OAuth credentials not set — Google login disabled");
}

export default passport;