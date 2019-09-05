import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
//import { ValidatorForm } from 'react-material-ui-form-validator';
import CloseIcon from '@material-ui/icons/Close';
import controller from '../controllers/controller';
class resetPassword extends React.Component {
    constructor(props) {
        super(props)
        let token = this.props.params.token
console.log(token)
        this.state = {
            password: "",
            confirmpassword: "",
            snackBarMessage: " ",
            openSnackBar: " "
        }
    }

    handlepasswordChange = (event) => {
        var password = event.target.value;
        this.setState({
            password: password
        })
    }
    handleconfirmpasswordChange = (event) => {
        var confirmpassword = event.target.value;
        this.setState({
            confirmpassword: confirmpassword
        })
    }
    handleLogin = () => {
        if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'password is empty'
            });
        } else if (this.state.confirmpassword === " ") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'confirmpassword is empty'
            });
        } else {
            controller.resetPassword(this.state.password, this.state.confirmpassword)
            //this.props.history.push('/login')
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
                <form className="resetpassword">
                    <h1>Resetpassword Page</h1>
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
                    <div>
                        <TextField
                            id="outlined-password-input"
                            label="confirmPassword"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleconfirmpasswordChange}
                            value={this.state.confirmpassword}
                        />
                    </div>
                    <div className="button">
                        <Button variant="outlined" color="primary" onClick={this.handleLogin}>
                            OK
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
export default resetPassword;