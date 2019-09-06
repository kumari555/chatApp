
const express = require('express')
const router = express.Router()
const jwt = require('../token')
const user = require('../services/service')
const nodemailer = require('../middlewear/mail')
const bcrypt = require('bcrypt')
//const login = require('../app/model/usermodel')
//console.log("jhgvdhjwgfhjdgfb");
/**
* @description : register APIs for register a new user using for register the mail
* @purpose : register user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.register = (req, res) => {
    // console.log("jhgvdhjwgfhjdgfb");
    req.checkBody('firstname', 'firstname is required.').notEmpty();
    req.checkBody('lastname', 'lastname is required.').notEmpty();
    req.checkBody('email', 'email is required.').notEmpty();
    req.checkBody('password', 'password is required.').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors)
    } else {
        let hash = bcrypt.hashSync('req.body.password', 10);
        var userData = {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "password": hash
        }
    }
    user.register(userData, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
}

/**
* @description : login APIs for login a new user using for register mail
* @purpose : login user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.login = (req, res) => {
    console.log("jhdd")

    req.checkBody("email", "email is required").notEmpty();
    req.checkBody("password", "password is required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(422).send(errors)
        // res.send('There have been validation errors: ' + util.inspect(errors), 400);
        return;
    } else {
        var userData = {
            "email": req.body.email,
            "password": req.body.password
        }
    }
    user.login(userData, (err, user) => {
        if (err) return res.status(404).send("There was a problem finding the user.", err);
        else
            res.status(200).send(user);
    });
}
/**
* @description : forgotpassword APIs is for geting the mail to create new password
* @purpose : forgotpassword user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.forgotPassword = (req, res) => {
    req.checkBody("email", "email is required").isEmail();
    //console.log('sadfasdf', req.body.email)
    var errors = req.validationErrors()
    if (errors) {
        return res.status(422).send(errors)
    } else {
        user.forgotPassword(req, (err, data) => {
            //console.log(data)
            if (err) {
                res.status(404).send(err)
            } else {
                //console.log("in forgotttttt", data);
                jwt.genrateToken(data, (err, token) => {
                    console.log("in send mail")
                    const url = `http://localhost:4000/resetPassword/${token}`;
                    nodemailer.sendMail(req, url, (err, mail) => {
                        // nodemailer.sendMail(req.body.email, url, (err, nodemailer) => {
                        if (err) return res.status(404).send(err);
                        else
                            res.status(200).send(mail);
                    })
                })
            }
        })
    }
}
/**
* @description : resetpassword APIs is for createnew password for the registered user
* @purpose : resetpassword user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.resetPassword = (req, res) => {
    // console.log("in controller")

    req.checkBody("password", "password is required").notEmpty();
    req.checkBody("confirmpassword", "confirmpassword is required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.status(422).send(errors)
        // res.send('There have been validation errors: ' + util.inspect(errors), 400);
        // return;
    } else {
        let hash = bcrypt.hashSync('req.body.password', 10);
        var userData = {
            "password": hash,
            "confirmpassword": req.body.confirmpassword
        }

        if (req.body.password !== req.body.confirmpassword) {
            console.log("mismatch")
            return res.status(422).send(errors)
        }
        //console.log("in controller", userData)
        req.userData = userData;
        user.resetPassword(req, (err, result) => {
            console.log("innn", user)
            if (err) {
                return res.status(404).send("error in reset controller", err)
            } else {
                return res.status(200).send(result)
            }
        });
    }
}
exports.GetUseres = (req, res) => {
    user.GetUseres(req, (err, user) => {
        if (err) return res.status(404).send("There was a problem finding the user.", err);
        else
            res.status(200).send(user);
    });
}
