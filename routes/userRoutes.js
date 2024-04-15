import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import express from 'express';
import nodemailer from "nodemailer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// user registration
router.post("/register", upload.single('profileImg'), async (req, res) => {
    try {
        // check if user already exists 
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            throw new Error("User already exists");
        }
        // check if image is uploaded 
        if (!req.file) {
            throw new Error("Image is required");
        }

        // password length check 8 characters more or equal 
        if (req.body.password.length < 8) {
            throw new Error("Password must be 8 characters or more");
        }

        // hash the password 
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        req.body.image = req.file.filename;

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// user login
router.post("/login", async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error("User does not exist");
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            throw new Error("Invalid Credentials");
        }

        if (validPassword) {
            // generate token 
            const token = jwt.sign({ _id: user._id, userName: user.userName, email:user.email, image: user.image }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, {
                maxAge: 60 * 60 * 1000,  // 1 hour
                secure: true,
                sameSite: 'strict'
            });
            res.status(200).json({ message: "User logged in successfully", user: { _id:user._id, userName: user.userName, email: user.email, image: user.image } } );
        } else {
            throw new Error("Invalid Credentials");
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message, error: error.message });
    }
});

// user logout
router.get("/logout", (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// forgot password 
router.post("/forgot-password", async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error("User does not exist");
        }
        // generate token 
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" }); 
        // send email with token
        const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Password Reset Notification',
            html: `
                <h1>Password Reset</h1>
                <h2>Click on the link below to reset your password</h2>
                <a href="http://localhost:5173/reset-password/${token}">Reset Password</a>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error('Email could not be sent');
            }
            res.status(200).json({ message: 'Email sent successfully' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// reset password
router.post("/reset-password/:token", async (req, res) => {
    try {
        // check if token is valid
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new Error("Invalid or expired token");
        }
        // check if user exists
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new Error("User does not exist");
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export { router as userRouter }