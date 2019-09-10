import React from 'react';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GetUseres from '../controllers/controller';
//import saveMsg from '../controllers/controller';
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
            email: '',
            msg: '',
            Sender: '',
            Receiver: '',
            msgDisplay: ''
        }
    }
    componentDidMount() {
        GetUseres.GetUseres()
            .then((result) => {
                this.setState({
                    AllUseres: result
                })
                console.log("result-------", result);
            }).catch((err) => {
                console.log("errrr", err);
            })
        getMsg.getMsg()
            .then((results) => {
                this.setState({
                    message: results
                })
                console.log("all messages-------", results);
            }).catch((err) => {
                console.log("errrr", err);
            })
        socket.on('Message', (result) => {
            const message = this.state.message;
            message.push(result);
            this.setState({ message: message });
        })
    }
    handleMessage = (e) => {
        var msg = e.target.value;
        console.log("msg-----------", msg);
        this.setState({
            msg: msg
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
    handleSend = () => {
        var Sender = localStorage.getItem('senderMail');
        this.setState({
            Sender: Sender
        })
        var data = {
            sender: Sender,
            receiver: this.state.Receiver,
            message: this.state.msg
        }
        console.log('---------------', data)
        socket.emit('sendMessage', data);
        this.setState({
            msg: '',
            anchorEl: null
        })
    }
    render() {
        var onlineUsers = this.state.AllUseres.map((key) => {
            if ((key.email) !== (localStorage.getItem('senderMail'))) {
                return (
                    <div> <MenuItem onClick={this.handleMenu}>{key.email}</MenuItem></div >
                )
            }
        })
        var msgdis = this.state.message.map((key) => {
            const s = localStorage.getItem('senderMail');
            return (
                <div>
                    {
                        key.sender === s ?
                            (<div className="ReceiverSide">
                                <div>{key.message}</div>
                            </div>)
                            : <div className='SenderSide'>
                                <div> {key.message}</div>
                            </div>
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
                        <div>
                            <li>
                                {msgdis}</li>
                        </div>

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
                    <Button variant="outlined" color="primary" onClick={(e) => this.handleSend(e)} >
                        send
             </Button>
                </div>
            </div>
        );

    }
}
export default dashboard;
