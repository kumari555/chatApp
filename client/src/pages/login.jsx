import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import controller from '../controllers/controller';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            message: "",
            snackBarMessge: " ",
            openSnackBar: false
        }
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
    handleRegister = () => {
        this.props.history.push('/register')
    }
    handleforgotpassword = () => {
        this.props.history.push('/forgotPassword')
    }
    handledashboard = () => {
        if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'email is empty'
            });
        } else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'password is empty'
            });
        }
        else {
            localStorage.setItem('senderMail', this.state.email)
            controller.login(this.state.email, this.state.password)
            this.props.history.push('/dashboard')
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
                <form className="login">
                    <h1>Login Page</h1>
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
                    <div className="button">
                        <Button variant="outlined" color="primary" onClick={this.handleRegister}>
                            Create
                         </Button>
                        <Button variant="outlined" color="primary" onClick={this.handledashboard}>
                            Submit
                          </Button>
                    </div>
                    <div className="Lbutton">
                        <Button variant="outlined" color="secondary" onClick={this.handleforgotpassword}>
                            forgotPassword
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
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleSnackClose}>
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </form>
            </div>
        )
    }
}
export default Login;