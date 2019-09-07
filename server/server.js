/********************************************************************************************************************
* @Execution : default node : cmd> server.js
*
*
* @Purpose : perform operations by using users
*
* @description : by using server file we can connected to localhost and routs file to build chat app
*
* @overview : chatapp application
* @author : rathnakumari b <rathnakumari55555@gmail.com>
* @version : 1.0
* @since : 26-aug-2019
*
*******************************************************************************************************************/

const express = require('express')
var bodyParser = require('body-parser');
const expressValidator = require('express-validator')
 const socketIo = require('socket.io')
//const io = require('socket.io')();
//const router = express.Router();
require('dotenv').config()
const routes = require('./routes/routes')
const mongoose = require('mongoose');
const chatcontrollers = require('../server/controller/chatcontroller');
const app = express()
app.use(bodyParser.json());
app.use(expressValidator())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/', routes)
mongoose.connect('mongodb://localhost:27017/easy-notes', { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to the database");
})
mongoose.connection.on("disconnected", () => {
    console.log('Could not connect to the database');
    process.exit();
})
// app.listen(4000, () => {
//     console.log("app running 4000 ")
// });
var server = app.listen(4000, () => {
    console.log("app running in 4000")
})
const io = socketIo(server); // < Interesting!
io.on('connection', (socket) => {
    console.log("user connected")
    socket.on('sendMessage', chatData => {
        console.log("socket catched", chatData)
        chatcontrollers.saveusers(chatData, (err, result) => {
            if (err) {
                console.log("error on server while receiving data");
            } else {
                // io.sockets.emit('emitMsg', result);
                console.log(result)
                // callback(null,result)
                io.sockets.emit('upddatedMsg', result)
            }

        })
    })
})
  