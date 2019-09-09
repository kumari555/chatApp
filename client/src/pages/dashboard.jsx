import React from 'react';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GetUseres from '../controllers/controller';
import saveMsg from '../controllers/controller';
import getMsg from '../controllers/controller';
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
            updatemsg: [],
            Receiver: '',
            Sender: '',
            msg: '',
            msgHistory: [],
            single: []
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
        saveMsg.saveMsg()
            .then((results) => {
                console.log("single", results)
                this.setState({
                    single: results.data
                })
                console.log("all messages-------", results);
            }).catch((err) => {
                console.log("errrr", err);
            })
        getMsg.getMsg()
            .then((results) => {
                console.log("in dash", results)
                this.setState({
                    message: results.data
                })
                console.log("all messages-------", results);
            }).catch((err) => {
                console.log("errrr", err);
            })
        socket.on('upddatedMsg', ((res) => {
            const msgHistory = this.state.msgHistory;
            console.log('res--------', res);
            msgHistory.push(res);
            console.log('message===>', msgHistory);
            // this.setState({
            //     msgHistory: msgHistory
            // })
        }))
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
    handlelist = (e) => {
        var send = e.target.value;
        this.setState({
            sender: send
        })
    }
    handleMessage = (event) => {
        var message = event.target.value;
        console.log(message)
        this.setState({
            msg: message
        })
        var data = {
            "sender": localStorage.getItem('senderMail'),
            "receiver": this.state.Receiver,
            "message": this.state.msg
        }
       console.log("data-------", data)
        socket.emit("sendMessage", data)
       

    }
    render() {
        const update = this.state.message.map((key) => {
            return (
                <div>
                    {key.sender === localStorage.getItem('senderMail') ? (
                        key.sender === this.state.receiver ?
                            (
                                <div className="sender-div">
                                    <label>{key.sender}:</label>
                                    <div>{key.message}</div>
                                </div>) : (null)
                    ) : (null)}
                    {key.sender === this.state.select ? (
                        <div className="receiver=div">
                            <label>{key.receiver}:</label>
                            <div>{key.message}</div>
                        </div>) : (null)
                    }
                </div>
            )
        })
        var onlineUsers = this.state.AllUseres.map((key) => {
            // console.log("in dashboard",key)
            if ((key.email) !== (localStorage.getItem('senderMail'))) {
                return (
                    <div> <MenuItem onClick={this.handleMenu}>{key.email}</MenuItem></div >
                )
            }
        })
        const msgdis = this.state.message.map((key) => {
            // console.log("message hjhjhjh", key.message)
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
                        {/* <h3>rathnakumari55555@gmail.com</h3> */}
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
                        <h4>To:  {localStorage.getItem('senderMail')}</h4>
                        <li>
                            {update}{msgdis}</li>
                        
                    </Card>
                </div>
                <div className="message">
                    <TextField
                        id="outlined-message"
                        label="message"
                        margin="normal"
                        variant="outlined"
                        onChange={(event) => { this.handleMessage(event) }}
                        value={this.state.msg}
                    />
                    <Button variant="outlined" color="primary" onClick={(e) => this.handlelist(e)} >
                        send
             </Button>
                </div>
            </div>
        );
    }
}
export default dashboard;