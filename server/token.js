/********************************************************************************************************************
* @Execution : default node : cmd> token.js
*
*
* @Purpose : perform operations by using users
*
* @description : by using token file we can genarate token for user id.
*
* @overview : chatapp application
* @author : rathnakumari b <rathnakumari55555@gmail.com>
* @version : 1.0
* @since : 26-aug-2019
*
*******************************************************************************************************************/
const jwt = require('jsonwebtoken')
secreatkey = 'password'
exports.genrateToken = (id, callback) => {
    try {
        console.log("in token gen ", id[0]._id)
        payload = { "userid": id[0]._id }
        jwt.sign(payload, secreatkey, (err, token) => {
            console.log("generate", token)
            if (err) {
                // console.log("error")
                callback(err)
            } else {
                //console.log("token")
                callback(null, token)
            }
        })

    } catch (e) {
        console.log(e)
    }
}
//verifing the token.

exports.verify = (req, res, next) => {
    try {
        let token = req.params.token;
        console.log(token);

        jwt.verify(token, secreatkey, (err, same) => {
            if (err) {
                res.status(422).send(err)
            }
            else {
                req.decoded = same;
                console.log("data", req.decoded)
                next()
            }
        })

    } catch (e) {
        console.log(e)
    }
}