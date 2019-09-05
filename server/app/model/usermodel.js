/********************************************************************************************************************
* @Execution : default node : cmd> usermodel.js
*
*
* @Purpose : perform operations by using users
*
* @description : by using usermodel file checking the given and connectin to the service to build chat app
*
* @overview : chatapp application
* @author : rathnakumari b <rathnakumari55555@gmail.com>
* @version : 1.0
* @since : 26-aug-2019
*
*******************************************************************************************************************/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema({
    "firstname": {
        type: String,
        required: true
    },
    "lastname": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
},
    {
        Timestamps: true
    });
const user = mongoose.model('login', Schema);
// module.exports = login
/**
* @description : register APIs for register a new user using for register the mail
* @purpose : register user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/

exports.register = (req, callback) => {
    console.log(req)
    user.find({
        "email": req.email
    }, (err, data) => {
        if (data.length <= 0) {
            var userDetails = new user(req)
            // console.log(data)
            userDetails.save((err, result) => {
                if (err) {
                    callback(err)
                    console.log("error accoured while saving the data", err);
                } else {
                    console.log("module ==", result)
                    callback(null, result)
                }
            })
        }
        else {
            callback("User exist")
        }
    })

}
/**
* @description : login APIs for login a new user using for register mail
* @purpose : login user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.login = (data, callback) => {
    console.log("data", data.email);
    user.findOne({
        "email": data.email
    }, (err, data) => {
        if (err && data.length <= 0) {
            callback(err)
            //console.log("error accoured while saving the data", err);
        } else {
            callback(null, data)
        }
    })
}
/**
* @description : forgotpassword APIs is for geting the mail to create new password
* @purpose : forgotpassword user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.forgotPassword = (data, callback) => {
    console.log(data.body.email);
    user.find({
        "email": data.body.email
    }, (err, data) => {
        console.log("data", data)
        if (data.length <= 0 || err) {
            callback("no data found")
            // console.log("error accoured while saving the data", err);
        } else {
            callback(null, data)
        }
    })
}
/**
* @description : resetpassword APIs is for createnew password for the registered user
* @purpose : resetpassword user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.resetPassword = (req, callback) => {
    console.log("in model", req.decoded._id)
    console.log(req.userData)
    user.updateOne({ "_id": req.decoded.userid },
        {
            "password": req.userData.password
        },
        (err, data) => {
            console.log("data", data)
            if (data.length <= 0 || err) {
                callback("no data found")
                // console.log("error accoured while saving the data", err);
            } else {
                callback(null, data)
            }
        })
}
exports.GetUseres = (data, callback) => {
    user.find({}, (err, data) => {
        console.log("data", data)
        if (data.length <= 0 || err) {
            callback("no data found")

        } else {
            callback(null, data)
        }
    })
}