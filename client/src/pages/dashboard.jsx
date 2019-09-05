import React from 'react';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GetUseres from '../controllers/controller';
class dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            AllUseres: []
        }
    }
    componentWillMount() {
        GetUseres.getUseres()
            .then((result) => {
                console.log("get useres data", result)
                this.setState({
                    AllUseres: result.data
                })
                console.log("all user after state set", this.state.AllUseres);

            })
    }
    render() {
        var onlineUsers = this.state.AllUseres.map((key) => {
            if ((key.email) !== (localStorage.getItem('senderMail'))) {
                return (
                    <div> {key.email}</div>
                )
            }
        })
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <h1>chatapp</h1>
                        <div className="Dbtn">
                            <Button color="inherit">Logout</Button></div>
                    </Toolbar>
                </AppBar>
                <div className="chat">
                    <Card className="user">
                        <h3> users</h3>
                        <ul>
                        <li>{onlineUsers}</li>
                        </ul>
                    </Card>
                    <Card className="list" >
                        <h3> chatlist</h3>
                    </Card>
                </div>
                <div className="message">
                    <TextField
                        id="outlined-message"
                        label="message"
                        margin="normal"
                        variant="outlined"
                    // onChange={this.handlefirstnameChange}
                    // value={this.state.firstname}
                    />
                    <Button variant="outlined" color="primary" >
                        send
                         </Button>
                </div>


            </div>
        );
    }
}
export default dashboard;