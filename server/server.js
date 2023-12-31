import {app} from "./app.js"
import Razorpay from "razorpay"
import { connectDB } from "./config/database.js"

connectDB()

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

app.listen(process.env.PORT, ()=> {
    console.log("server is working......")
})