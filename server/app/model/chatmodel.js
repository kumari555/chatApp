const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    "sender": {
        type: String,
        require: true
    },
    "receiver": {
        type: String,
        require: true
    },
    "message": {
        type: String,
        require: true
    },
},
    {
        Timestamps: true

    });
const user = mongoose.model('chat', Schema);
exports.saveMsg = (data, callback) => {
    // console.log(data);
    // console.log("fffdfgd")
    console.log(data)
    var details = new user({
        "sender": data.sender,
        "receiver": data.receiver,
        "message": data.message
    })
    details.save((err, data) => {
        console.log("in model data", data)
        if (data.length <= 0 || err) {
            callback("no data found")
        } else {
            callback(null, data)
        }
    })
}
exports.getMsg = (data, callback) => {
    //console.log("data",data)
    user.find({}, (err, data) => {
        console.log("model", data)
        if (err) {
            callback("no data found", err)
        } else {
            callback(null, data)
        }
    })
}


