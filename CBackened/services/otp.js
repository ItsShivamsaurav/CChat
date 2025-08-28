const nodemailer = require("nodemailer");
require('dotenv').config();
const OtpModel = require("../models/otp");

const transporter = nodemailer.createTransport({
    service:'Gmail', // or use SMTP config
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});


const sendOtpEmail = async (toEmail, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        // console.log('OTP email sent successfully');
    } catch (error) {
        // console.error('Error sending OTP email:', error);
        throw error;
    }
};


const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
}

const isOtpValid = async (email, submittedOtp) => {
    const record = await OtpModel.findOne({ email });
    if (!record) return false;
    if(record.otp !== submittedOtp) return false
    return true;
};


module.exports = {
    sendOtpEmail,
    generateOtp,
    isOtpValid      
};