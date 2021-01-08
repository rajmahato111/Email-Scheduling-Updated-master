// Requiring Modules
const express = require('express');
const moment = require('moment');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const router = express.Router();
const Email = require('../model/email');
const FailedEmail = require('../model/failedEmail');
const transporter = require('../emails/transporter');

var currDate = moment().format("DD/MM/YYYY");

// POST Route - Creating Emails in the DB and scheduling it
router.post('/', (req, res) => {

    //Getting user date input
    let dateVariable = req.body.date
    let dateArr = dateVariable.split("/");
    let dayOfMonth = dateArr[0];
    let month = dateArr[1];

    //Getting user time input
    let timeVariable = req.body.time
    let timeArr = timeVariable.split(":");
    let hour = timeArr[0];
    let minute = timeArr[1];
    let second = timeArr[2];
    
    // Email instance
    if(req.body.date === currDate || req.body.date > currDate){
        const email = new Email({
            date: req.body.date,
            time: req.body.time,
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        });
    
        email.save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.json({ message: err });
            })    
    }else{
        const failedEmail = new FailedEmail({
            date: req.body.date,
            time: req.body.time,
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        });
    
        failedEmail.save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.json({ message: err });
            })    
    }
    //Creating Transport
    transporter;

    // Email message Option
    const mailOptions = {
        date: req.body.date,
        time: req.body.time,
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    }

    // Scheduling Email
    cron.schedule(`${minute} ${hour} ${dayOfMonth} ${month} *`,
        () => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Email Sent: ${info.response}`)
                }
            })
        });
});

// Reading Email
router.get('/', (req, res) => {
    Email.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})


// Updating Email
router.patch('/:id', (req, res) => {

    // Email instance
    if(req.body.date === currDate || req.body.date > currDate){
        Email.updateOne({ _id: req.params.id },
            {
                $set: {
                    date: req.body.date,
                    time: req.body.time,
                    from: req.body.from,
                    to: req.body.to,
                    subject: req.body.subject,
                    text: req.body.text
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.json({ message: err })
            })
    }else{
        FailedEmail.updateOne({ _id: req.params.id },
            {
                $set: {
                    date: req.body.date,
                    time: req.body.time,
                    from: req.body.from,
                    to: req.body.to,
                    subject: req.body.subject,
                    text: req.body.text
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.json({ message: err })
            })
    }

    transporter;

    const mailOptions = {
        date: req.body.date,
        time: req.body.time,
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    }

    //Getting user date input
    let dateVariable = req.body.date
    let dateArr = dateVariable.split("/");
    let dayOfMonth = dateArr[0];
    let month = dateArr[1];

    //Getting user time input
    let timeVariable = req.body.time
    let timeArr = timeVariable.split(":");
    let hour = timeArr[0];
    let minute = timeArr[1];
    let second = timeArr[2];

    // Scheduling Email
    cron.schedule(`${minute} ${hour} ${dayOfMonth} ${month} *`,
        () => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Email Sent: ${info.response}`)
                }
            })
        });
})

//Deleting Email
router.delete('/:id', (req, res) => {
    Email.remove({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => res.json({ message: err }))
})

//Exporting Router
module.exports = router;