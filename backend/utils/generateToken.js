//Create a JWT token
import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

    // Set the token in a cookie
    res.cookie('jwt-netflix', token, {
        httpOnly: true, //Prevent client-side JS from reading the cookie
        sameSite: "Strict", //Cross-Site Request Forgery (CSRF) protection
        secure: process.env.NODE_ENV !== 'development', // Set to true in production (HTTPS)
        maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days in milliseconds
    });

    return token;
};