import { instance } from "../server.js"
import crypto from "crypto"
import { Payment } from "../model/paymentModel.js"
import CryptoJS from 'crypto-js';

export const checkout = async (req, res) => {

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR"
    }

    const order = await instance.orders.create(options)

    console.log(order);
    res.status(200).json({
        success: true,
        order
    })
}

export const paymentVerification = async (req, res) => {

    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    const body = razorpay_order_id + "|" +razorpay_payment_id;

    const expectedSingtuer = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex')

    // console.log("sig received", razorpay_signature);
    // console.log("sig generated", expectedSingtuer);

    const isAuthentic = expectedSingtuer === razorpay_signature 
    
    await Payment.create({razorpay_order_id, razorpay_payment_id, razorpay_signature})

    const data = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    };

    const jsonData = JSON.stringify(data);
    const secretKey = 'jai_shree_ram'; 
    const encryptedData = CryptoJS.AES.encrypt(jsonData, secretKey).toString();

    console.log({encryptedData})
    if (isAuthentic) {
        res.redirect(`http://localhost:3000/paymentsuccess?reference=${encryptedData}`)
    }else{
        res.status(400).json({
        success: false,
    })
    }

    
}