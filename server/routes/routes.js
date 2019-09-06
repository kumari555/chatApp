/**
* @description : routes file will post  the data to controller
* @purpose : routes  in database
* @param {root}, which has data information
* @param {params}, input by users
* @param {context}, req from queries, headers, server
*/
const express = require('express')
const router = express.Router();
const controller = require('../controller/controller')
const controllers = require('../controller/chatcontroller')
const auth = require('../token')
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/forgotPassword', controller.forgotPassword);
router.get('/resetPassword/:token', auth.verify, controller.resetPassword);
router.get('/GetUseres', controller.GetUseres);
router.get('/getusers', controllers.getusers);
router.post('/saveusers', controllers.saveusers);
//console.log("in")
module.exports = router
