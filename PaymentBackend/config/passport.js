import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/user/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(null, false);
                }

                let user = await userModel.findOne({ email });

                if (!user) {
                    const randomPassword = await bcrypt.hash(
                        Math.random().toString(36) + Date.now(),
                        10
                    );

                    user = await userModel.create({
                        name: profile.displayName,
                        email,
                        password: randomPassword,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;