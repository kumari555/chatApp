var modeldata = require('../app/model/chatmodel')
exports.getusers = (data, callback) => {
    // console.log("data",data)
    modeldata.getusers(data, (err, data) => {
        // console.log("data in services", data)
        if (err) {
            console.log("error", err);
            callback(err);
        } else
            callback(null, data);
    });
}

exports.saveusers = (data, callback) => {
    console.log("data in services", data.body)
    modeldata.saveusers(data, (err, data) => {
        if (err) {
            console.log("error", err);
            callback(err);
        } else
            callback(null, data);
    });
}
