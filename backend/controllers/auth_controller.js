import bcryptjs from 'bcryptjs';
import  User  from '../models/user_model.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';


export async function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        //Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({success: false, message: 'All fields are required' });
        }

        
        // Check if the username already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        // Check if the email already exists
        const existingUserEmail = await User.findOne({ email: email });
        if (existingUserEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        //Check if the email is setup correctly
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        //Check if the password length is valid
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        //Probably it's not necessary to check this but just in case :)
        if (newUser) {
            // Generate JWT token and set it in a cookie
            generateTokenAndSetCookie(newUser._id, res);
            // Save the user to the database
            await newUser.save();
            res.status(201).json({ 
                success: true,
                user: {
                    ...newUser._doc,
                    password: undefined, // Exclude the password from the response
                },
                message: 'User registered successfully'
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req, res) {
   try {
        const { email, password } = req.body;

        //Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        // Check if the user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token and set it in a cookie
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({ 
            success: true,
            user: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            },
            message: 'Logged in successfully' 
        });
   } catch (error) {
        console.error("Error in the login controller:", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
   }
}

export async function logout(req, res) {
    try {
        res.clearCookie('jwt-netflix');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error("Error in the logout controller:", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


