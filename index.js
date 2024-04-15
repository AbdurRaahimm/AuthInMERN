import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import { userRouter } from './routes/userRoutes.js';
import authVerify from './middleware/authVerify.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    credentials: true,
}
));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));


app.get('/', authVerify, (req, res) => {
    // res.send(`Welcome ${req.username} with email ${req.email} and image ${req.image} with id ${req.userid}`);
    res.json({
        message: `welcome to the Profile page`,
        user: {
            username: req.username,
            email: req.email,
            image: req.image,
            id: req.userid
        }
    });
});

app.use('/api/user', userRouter);

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
    await connectDB();
});