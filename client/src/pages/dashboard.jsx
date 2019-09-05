import React from 'react';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GetUseres from '../services/userservices';
class dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            AllUseres: ""
        }
    }
    componentDidMount() {
        GetUseres()
            .then((result) => {
                console.log("iiiiii",result)
                console.log("get useres data", result)
                this.setState({
                    AllUseres: result.data
                })
            })
    }
    render() {
        // const data = this.state.AllUseres.map((char) => {
        //     return (
        //         <div>{char.key}:{char.email}</div>
        //     )
        // })
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
                        {/* {data} */}
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
                    />
                    <Button variant="outlined" color="primary">
                        Send
                          </Button>
                </div>
            </div>
        );
    }
}
export default dashboard;