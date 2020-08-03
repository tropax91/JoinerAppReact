import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle } from 'reactstrap';
import { FacebookLoginButton } from 'react-social-login-buttons';




export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {            
            Email: '',
            Password: '',
            emailError: '',
            passwordError: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    LoginValidate() {
        let emailError = '';
        let passwordError = '';


        if (!this.state.Email) {
            emailError = 'Venligst skriv e-mail!';
        }
   
        if (!this.state.Password) {
            passwordError = 'Venligst skriv adgangskode!'
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        const isValid = this.LoginValidate();

        if (isValid) {
            fetch('https://localhost:44359/api/Account/Login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.status === 'Error')
                        this.props.displayPopover("Invalid Email or Password!!");
                    if (result.status === 'Invalid')
                        this.props.displayPopover("User doesn't exist.");
                    if (result.status === 'Success') {
                        this.props.history.push("/profilepage")
                        this.props.displayPopover("Login Successfully");
                        this.props.checkLoginStatus();
                    }
                })
        }

    }



    render() {
        return (
            <div>
                <Card className='LoginCard'>
                    <form className='login-form' onSubmit={this.handleSubmit}>                    
                        <CardTitle className='text-center'>Log ind</CardTitle>

                    <FormGroup>
                        <Label>E-mail </Label>
                        <Input type='email' name='Email' value={this.state.Email} onChange={this.handleChange}  />
                    </FormGroup>
                    <div style={{ color: 'red', fontSize: 12 }}> {this.state.emailError} </div>

                    <FormGroup>
                        <Label> Adgangskode </Label>
                        <Input type='password' name='Password' value={this.state.Password} onChange={this.handleChange}  />
                        </FormGroup>
                        <div style={{ color: 'red', fontSize: 12 }}> {this.state.passwordError} </div>

                        <Button type="submit" color="primary" size='lg' block>Log ind</Button>
                        <div className='text-center pt-3'>
                            Eller 
                        </div>
                        { <FacebookLoginButton className='mt-3 mb-3' /> }
                    <div className='text-center pt-3'>Har du ikke en bruger?</div>
                        <div className='text-center pt-2'>
                            <a id='logA' href='/register'> Opret en ny bruger </a>
                        <span className='p-2'> | </span>
                            <a id='logA' href='/login'> Glemt kodeord? </a>
                    </div>
                    </form>
                </Card>

            </div>);



    }



}
