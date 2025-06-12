import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import myListRouter from './route/myList.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // ✅ fix here
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.get("/", (req, res) => {
    res.json({
        message: "Server is running on port " + process.env.PORT
    });
});

app.use('/api/user',userRouter);
app.use('/api/category',categoryRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/myList',myListRouter);


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is running on port", process.env.PORT);
    });
});