import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import controller from '../controllers/controller';

class register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            snackBarMessage: "",
            openSnackBar: false
        }
    }
    handlefirstnameChange = (event) => {
        var firstname = event.target.value;
        this.setState({
            firstname: firstname
        })
    }
    handlelastnameChange = (event) => {
        var lastname = event.target.value;
        this.setState({
            lastname: lastname
        })
    }
    handleEmailChange = (event) => {
        var email = event.target.value;
        this.setState({
            email: email
        })
    }
    handlepasswordChange = (event) => {
        var password = event.target.value;
        this.setState({
            password: password
        })
    }
    handleLogin = () => {
        this.props.history.push('/login')
    }
    handlesubmit = () => {
        if (this.state.firstname === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'firstname is empty'
            });
        } else if (this.state.lastname === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'lastname is empty'
            });
        } else if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'email is empty'
            });
        } else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'password is empty'
            });
        } else {
            controller.register(this.state.firstname, this.state.lastname, this.state.email, this.state.password)
            this.props.history.push('/login')
        }

    }
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in login");
        }
    }
    render() {
        return (
            <div>
                <form className="register">
                    <h1>Register Page</h1>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="firstname"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handlefirstnameChange}
                            value={this.state.firstname}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-name"
                            label="lastname"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handlelastnameChange}
                            value={this.state.lastname}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleEmailChange}
                            value={this.state.email}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handlepasswordChange}
                            value={this.state.password}
                        />
                    </div>
                    <div className="Rbutton">
                        <Button variant="outlined" color="primary" onClick={this.handleLogin}>
                            Login
                         </Button>
                        <Button variant="outlined" color="primary" onClick={this.handlesubmit}>
                            Submit
                          </Button>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={this.state.openSnackBar}
                        autoHideDuration={6000}
                        onClose={this.handleSnackClose}
                        variant="error"
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id"> {this.state.snackBarMessage} </span>}
                        action={[
                            <div>
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleSnackClose}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        ]}
                    />
                </form>

            </div>
        )
    }
}
export default register;