const express = require('express')
const user = require('../services/chatservices')
exports.getusers = (req, res) => {
    // console.log("data",req)
    user.getusers(req, (err, user) => {
        if (err) return res.status(404).send("There was a problem finding the user.", err);
        else
            res.status(200).send(user);
    });
}
exports.saveusers = (req, res) => {
    console.log("res in controller", req.body)
    user.saveusers(req, (err, user) => {
        if (err) return res.status(404).send("There was a problem finding the user.", err);
        else
            res.status(200).send(user);
    });
}
