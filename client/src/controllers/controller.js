import authServices from '../services/userservices';
import axios from 'axios';
import { saveusers } from '../../../server/controller/chatcontroller';
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
    getUseres() {
        return axios.get(authServices.getUseres)
        //     .then(response => {
        //     console.log("response--" + JSON.stringify(response));
        //     if (response.status === 200) {
        //         console.log("resetpassword sucess",response.data);
        //         return response.data;
        //     }
        // }).catch(error => {
        //     console.log("resetpassword failed", error);
        //     return error;
        //     return error;
        // })
    },
    saveusers() {
        return axios.get(authServices.saveusers)
    }
}
export default controller;