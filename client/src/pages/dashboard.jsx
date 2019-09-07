import React from 'react';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GetUseres from '../controllers/controller';
//import saveusers from '../controllers/controller';
import getusers from '../controllers/controller';
const socketIo = require('socket.io-client');
const socket = socketIo();
// import RadioButtonGroup from '@material-ui/core/Radio';
// import RadioButton from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
class dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            AllUseres: [],
            message: [],
            msgdis: [],
            Receiver: '',
            Sender: '',
            msg: ''
        }
    }
    componentDidMount() {
        GetUseres.getUseres()
            .then((result) => {
                console.log("get useres data", result)
                this.setState({
                    AllUseres: result.data
                })
                console.log("all user after state set", this.state.AllUseres);
            })
        getusers.getusers()
            .then((results) => {
                console.log("in dash", results)
                this.setState({
                    message: results.data
                })
                console.log("all messages-------", results);
            }).catch((err) => {
                console.log("errrr", err);
            })
        const sen = localStorage.getItem('Sender');
        socket.on(sen, (res) => {
            const message = this.state.message;
            console.log('res----------', res);
            message.push(res);
            console.log('message', message);
            this.setState({
                message: message
            })
            console.log('Dash board messaage-----', this.state.message);
        })
    }
    handlelogin = () => {
        this.props.history.push('/login')
    }
    handleMenu = (event) => {
        var r = event.target.textContent;
        this.setState({
            Receiver: r
        })
    }
    handlelist = () => {
        var sender = localStorage.getItem('Sender');
        this.setState = {
            Sender: sender
        }
        var data = {
            "sender": data.body.sender,
            "receiver": data.body.receiver,
            "message": data.body.message
        }
        console.log("data-------", data)
        socket.emit("sendMessage", data)
        this.setState = {
            msg: ''
        }
    }
    handleMessage = (event) => {
        var message = event.target.value;
        this.setState({
            msg: message
        })
    }
    render() {

        var onlineUsers = this.state.AllUseres.map((key) => {
            // console.log("in dashboard",key)
            if ((key.email) !== (localStorage.getItem('senderMail'))) {
                return (
                    <div> <MenuItem onClick={this.handleMenu}>{key.email}</MenuItem></div >
                )
            }
        })
        const msgdis = this.state.message.map((key) => {
            return (
                <div>
                    {key.sender === this.state.sender ?
                        (<div className="sender=div">
                            <label>{key.sender}:</label>
                            <div>{key.message}</div>
                        </div>)
                        : (<div className="receiver=div">
                            <label>{key.sender}:</label>
                            <div>{key.message}</div>
                        </div>)
                    }
                </div>
            )
        })
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <h1>chatapp</h1>
                        <div className="Dbtn">
                            <Button color="inherit" onClick={this.handlelogin}>
                                Logout
                                </Button></div>
                    </Toolbar>
                </AppBar>
                <div className="chat">
                    <Card className="user">
                        <div>
                            <h3>Users</h3>
                            {onlineUsers}
                        </div>
                    </Card>
                    <Card className="list" >
                        <h3> chatlist</h3>


                        <li>{msgdis}</li>

                        {localStorage.getItem('senderMail')}
                    </Card>
                </div>
                <div className="message">
                    <TextField
                        id="outlined-message"
                        label="message"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleMessage}
                        value={this.state.msg}
                    />

                    <Button variant="outlined" color="primary" onClick={this.handlelist} >
                        send
                         </Button>
                </div>


            </div>
        );
    }
}
export default dashboard;