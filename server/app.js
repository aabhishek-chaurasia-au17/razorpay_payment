import express from "express";
import {config} from "dotenv"
import paymentRoute from "./routes/paymentRoute.js"
import cors from "cors"
export const app = express()
config({path: "./config/config.env"})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api", paymentRoute)

app.get("/api/getKey", (req, res) => {
    return(
        res.status(200).json({key: process.env.RAZORPAY_KEY_ID})
    )
})