import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import controller from '../controllers/controller';
//import Card from '@material-ui/core/Card';
class forgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            snackBarMessage: "",
            openSnackBar: false
        }
    }
    handleEmailChange = (event) => {
        var email = event.target.value;
        this.setState({
            email: email
        })
    }
    handleResetpassword = () => {
        if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: 'email is empty'
            });
        }
        else {
            controller.forgotPassword(this.state.email)
        }
        this.props.history.push('/resetPassword')
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
                <form className="forgotPassword">
                    <h1>Forgotpassword Page</h1>
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
                    <div className="Fbutton">
                        <Button variant="outlined" color="primary" onClick={this.handleResetpassword}>
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
export default forgotPassword;