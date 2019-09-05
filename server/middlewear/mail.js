/********************************************************************************************************************
* @Execution : default node : cmd> mail.js
*
*
* @Purpose : perform operations by using users
*
* @description : by using mail file we cansend msg to another mail
*
* @overview : chatapp application
* @author : rathnakumari b <rathnakumari55555@gmail.com>
* @version : 1.0
* @since : 26-aug-2019
*
*******************************************************************************************************************/
const nodemailer = require("nodemailer");
// const env = require('dotenv')
require('dotenv').config();
exports.sendMail = (data, url, callback) => {
    console.log("in mailer", process.env.email)
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: { 
            user: process.env.email,
            pass: process.env.password
        }
    });
    console.log("mail sender", url, data.body)
    transport.sendMail({
        from: process.env.email,
        to: data.body.email,
        subject: "token",
        text: url
    }, (err, mail) => {
        if (err) {
            console.log("mail not sent", err)
            callback(err)
        }
        else {
            console.log("mail sent");
            callback(null, mail)
        }
    })

}

