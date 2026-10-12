import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config.js";
import { find_or_create_google_user, find_user_by_id } from "../repo/auth.repo.js";

if (config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.GOOGLE_CLIENT_ID,
                clientSecret: config.GOOGLE_CLIENT_SECRET,
                callbackURL: config.GOOGLE_CALLBACK_URL,
            },
            async (profile, done) => {
                try {
                    const user = await find_or_create_google_user(profile);
                    return done(null, user);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );
} else {
    console.warn("Google OAuth warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not set in environment variables.");
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await find_user_by_id(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;