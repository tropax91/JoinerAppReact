import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom'
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Designer } from './components/Designer';
import { CreateOrder } from './components/CreateOrder';
import { RegisterPage } from './components/Register';
import { OrdersTable } from './components/OrdersTable';
import { OrderDetails } from './components/Admin/OrderDetails';
import { MaterialsTable } from './components/Admin/MaterialsTable';
import { Popover } from './components/Popover';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard'
import { ProfilePage } from './components/ProfilePage';
import { EditUser } from './components/EditUser';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            displayPopover: false,
            popoverMessage: '',
            userIsLoggedIn: false,
            userType: ''
        };
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    checkLoginStatus = () => {
        fetch('https://localhost:44359/api/Account/UserSession')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    userIsLoggedIn: json.isLoggedIn,
                    userType: json.userType
                });
            });
    }

    handleLogout = () => {
        fetch('https://localhost:44359/api/Account/Logout', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.checkLoginStatus();
        }).catch(error => {
            console.log('logout error', error);
        });
    }

    render() {
        return (
            <Layout userIsLoggedIn={this.state.userIsLoggedIn} handleLogout={this.handleLogout} >
                <Switch>
                    <Route exact path='/' render={(props) => <Home {...props} loggedInStatus={this.state.loggedInStatus} />} />
                    <Route path='/register' render={(props) => <RegisterPage {...props} displayPopover={this.displayPopover} setUserLoggedInState={this.setUserLoggedInState} />} />
                    <Route path='/login' render={(props) => <Login {...props} displayPopover={this.displayPopover} checkLoginStatus={this.checkLoginStatus} setUserLoggedInState={this.setUserLoggedInState} />} />
                    <Route path='/profilepage' render={(props) => (this.state.userIsLoggedIn ? <ProfilePage {...props} /> : <Redirect to='/login' />)} />
                    <Route path='/edituser' render={(props) => <EditUser {...props} displayPopover={this.displayPopover} setUserLoggedInState={this.setUserLoggedInState} />} />
                    <Route path='/designer' render={(props) => <Designer {...props} displayPopover={this.displayPopover} />} />
                    <Route path='/createorder' render={(props) => <CreateOrder {...props} displayPopover={this.displayPopover} />} />
                    <Route path='/Admin' render={(props) => (this.userIsAdmin() ? <AdminDashboard {...props} /> : <Redirect to='/login' />)} />
                    <Route path='/OrderDetails' render={(props) => (this.state.userIsLoggedIn ? <OrderDetails {...props} userIsAdmin={this.userIsAdmin()} /> : <Redirect to='/' /> )} />
                    <Route path='*' component={() => '404 PAGE NOT FOUND!'} />
                </Switch>
                {this.state.displayPopover && <Popover message={this.state.popoverMessage} />}
            </Layout>
        );
    }

    displayPopover = (message) => {
        this.setState({ displayPopover: true, popoverMessage: message });
        setTimeout(() => {
            this.setState({ displayPopover: false });
        }, 3000);
    }

    userIsAdmin = () => {
        if (this.state.userType === 'Admin') {
            return true;
        }
        return false;
    }

    userIsOperator = () => {
        if (this.state.userType === 'Operator') {
            return true;
        }
        return false;
    }

    userIsCustomer = () => {
        if (this.state.userType === 'Customer') {
            return true;
        }
        return false;
    }
}
