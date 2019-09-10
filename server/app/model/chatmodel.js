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
    // console.log("data in model===> " + data.body.sender);
    // console.log("fffdfgd")
    // console.log("message before sending to  database===>" + data)
    var details = new user({
        "sender": data.sender,
       "receiver": data.receiver,
        "message": data.message
    })
    details.save((err, result) => {
        // console.log("in model data", data)
        if (data.length <= 0 || err) {
            return callback(null, "no data found")
        } else {
            return callback(null, result)
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


