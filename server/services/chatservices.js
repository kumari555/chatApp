var modeldata = require('../app/model/chatmodel')
exports.saveMsg = (data, callback) => {
    //console.log("data in services", data.body)
    modeldata.saveMsg(data, (err, data) => {
        if (err) {
            console.log("error", err);
            callback(err);
        } else
            callback(null, data);
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

