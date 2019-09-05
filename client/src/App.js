import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';
import dashboard from './pages/dashboard';
// import Search from './';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' exact component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/forgotPassword' component={ForgotPassword}></Route>
                    <Route path='/resetPassword/:token' component={ResetPassword}></Route>
                    <Route path='/dashboard' component={dashboard}></Route>
                    {/* <Route path='/search' component={Search}></Route> */}
                </div>
            </Router>
        );
    }
}

export default App;