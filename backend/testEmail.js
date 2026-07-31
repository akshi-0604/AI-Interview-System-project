import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

try {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Testing Gmail",
        text: "This is a Gmail test.",
    });

    console.log("SUCCESS");
} catch (err) {
    console.log(err);
}