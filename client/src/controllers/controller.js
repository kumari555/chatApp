import authServices from '../services/userservices';
import axios from 'axios';

var controller = {
    register(firstname, lastname, email, password) {
        var data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }
        //console.log(data)
        return axios.post(authServices.register, data).then(response => {
            console.log("response--" + JSON.stringify(response));
            if (response.status === 200) {
                console.log("register sucess")
            }
        })
            .catch(error => {
                console.log("registration failed", error);
                //return error;
            })
    },
    login(email, password) {

        var data = {
            email: email,
            password: password
        }
        return axios.post(authServices.login, data).then(response => {
            console.log("response--" + JSON.stringify(response));
            if (response.status === 200) {
                console.log("login sucess")
            }

        })
            .catch(error => {
                console.log("login failed", error);
                //return error;
            })
    },
    forgotPassword(email) {
        var data = {
            email: email
        }
        return axios.post(authServices.forgotPassword, data).then(response => {
            console.log("response--" + JSON.stringify(response));
            if (response.status === 200) {
                console.log("login sucess")
            }
        })
            .catch(error => {
                console.log("login failed", error);
            })
    },
    resetPassword(password, confirmpassword) {
        var data = {
            password: password,
            confirmpassword: confirmpassword
        }
        return axios.get(authServices.resetPassword, data).then(response => {
            console.log("response--" + JSON.stringify(response));
            if (response.status === 200) {
                console.log("resetpassword sucess")
            }
        }).catch(error => {
            console.log("resetpassword failed", error);
            //return error;
        })
    },
    GetUseres() {  
        return axios.get(authServices.GetUseres).then(response => {
            console.log("response----------->>>>>>>>>>>>", response.data);
            if (response.status === 200) {
                console.log("get all useres sucess");
                return response.data;
            }
        })
            // return data;
            .catch(error => {
                console.log("get all useres failed", error);
                //return error;
            })
    },
    getMsg() {
        return axios.get(authServices.getMsg).then(response => {
            console.log("all chats------", response.data);
            if (response.status === 200) {
                console.log("get all chats sucess");
                return response.data;
            }
        })
            // return data;
            .catch(error => {
                console.log(" get all chats failed", error);
                //return error;
            })
    }
}
export default controller;
    // saveMsg(sender, receiver, message) {
    //     var data = {
    //         sender: sender,
    //         receiver: receiver,
    //         message: message
    //     }
    //     console.log ("frontend controller", data)
    //     return axios.post(authServices.saveMsg, data)
        //     console.log("response--" + JSON.stringify(response));
        //     if (response.status === 200) {
        //         console.log(" sucess")
        //         return response
        //     }
        // }).catch(error => {
        //     console.log(" failed", error);
        //     return error;
        // })
    // },
    // getMsg() {
    //     return axios.get(authServices.getMsg)
        //     console.log("response--" + JSON.stringify(response));
        //     if (response.status === 200) {
        //         console.log(" sucess")
        //     }
        // }).catch(error => {
        //     console.log(" failed", error);
        //     return error;
        // })
    // },
    

