var modeldata = require('../app/model/usermodel')
/**
* @description : register APIs for register a new user using for register the mail
* @purpose : register user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.register = (data, callback) => {
    modeldata.register(data, (err, data) => {
        if (err) {
            console.log("enter valid input", err);
            callback(err);
        } else
            callback(null, data);
    });
}
/**
* @description : login APIs for login a new user using for register mail
* @purpose : login user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.login = (data, callback) => {
    modeldata.login(data, (err, user) => {
        if (err) {

            callback(err);
        } else
            callback(null, user);
    });
}
/**
* @description : forgotpassword APIs is for geting the mail to create new password
* @purpose : forgotpassword user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.forgotPassword = (req, callback) => {
    modeldata.forgotPassword(req, (err, data) => {
        if (err) {
            console.log("enter valid input", req.body);
            callback(err);
        } else
            callback(null, data);
    });
}
/**
* @description : resetpassword APIs is for createnew password for the registered user
* @purpose : resetpassword user in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
exports.resetPassword = (data, callback) => {
   // console.log("in servece",data)
    modeldata.resetPassword(data, (err, data) => {
        if (err) {
            console.log("enter valid input", err);
            callback(err);
        } else
            callback(null, data);
    });
}
exports.GetUseres = (data, callback) => {
    modeldata.GetUseres(data, (err, data) => {
        if (err) {
            console.log("enter valid input", err);
            callback(err);
        } else
            callback(null, data);
    });
}
