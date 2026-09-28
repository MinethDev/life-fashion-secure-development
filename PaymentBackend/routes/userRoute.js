import express from 'express';
import { loginUser, registerUser, adminLogin, googleCallback } from '../controllers/userController.js';
import passport from '../config/passport.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// Google OAuth
userRouter.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

userRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: 'http://localhost:5174/login'
    }),
    googleCallback
);


export default userRouter;