import { connect } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from "./configs/database.config";

dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: ["https://online-food-delievery-platform.vercel.app/"]
}));

// app.use(cors({}));

app.use("/api/foods",foodRouter);
app.use("/api/users",userRouter);
app.use("/api/orders", orderRouter);


const port = 4000;
app.listen(port, () => {
    console.log("server is running on port", port);
})