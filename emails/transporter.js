const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'liam.shanahan65@ethereal.email',
        pass: process.env.PASSWORD
    }
})

module.exports = transporter;