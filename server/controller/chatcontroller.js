const express = require('express')
const user = require('../services/chatservices')
exports.saveMsg = (req, callback) => {
    //console.log("data", req)
    user.saveMsg(req, (err, user) => {
        if (err) {
            //console.log("error", err);
            callback(err);
        } else
            callback(null, user);
    });
}
exports.getMsg = (req, res) => {
    // console.log("data",req)
    user.getMsg(req, (err, user) => {
        if (err) return res.status(404).send("There was a problem finding the user.", err);
        else
            res.status(200).send(user);
    });
}


