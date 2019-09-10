var modeldata = require('../app/model/chatmodel')
exports.saveMsg = (req, callback) => {
    //console.log("data in services", req.body.sender)
    modeldata.saveMsg(req, (err, data) => {
        if (err) {
            console.log("error", err);
           return callback(err);
        } else
           return callback(null, data);
    });
}

exports.getMsg = (data, callback) => {
    // console.log("data",data)
    modeldata.getMsg(data, (err, data) => {
        // console.log("data in services", data)
        if (err) {
            console.log("error", err);
            callback(err);
        } else
            callback(null, data);
    });
}

