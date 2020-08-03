import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle } from 'reactstrap';




export class RegisterPage extends Component {
   
    constructor(props) {
        super(props);

        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Password: '',
            firstNameError: '',
            lastNameError: '',
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

    validate() {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let passwordError = '';


        if (!this.state.FirstName) {
            firstNameError = 'Skriv venligst fornavn!'
        }

        if (!this.state.LastName) {
            lastNameError = 'Skriv venligst efternavn!'
        }

        if (!this.state.Email) {
            emailError = 'Skriv venligst e-mail!';
        }

        else if (!this.state.Email.includes('@')) {
            emailError = 'Ugyldigt email!';
        }

        if (!this.state.Password) {
            passwordError = 'Skriv venligst kodeord!'
        }

        else if (this.state.Password.length < 6) {
            passwordError = 'Kodeord skal minimum være 6 tegn!'
        }

        if (emailError || firstNameError || lastNameError || passwordError) {
            this.setState({ emailError, firstNameError, lastNameError, passwordError });
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            fetch('https://localhost:44359/api/Account/InsertUser', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(Response => {
                    return Response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.status === 'Error')
                        this.props.displayPopover("User already exists!");
                    if (data.status === 'Success') {
                        this.props.history.push("/Login")
                        this.props.displayPopover("You've been registered!");
                    }
                })
        }
    }


    render() {
        return (
            <div>
                <Card className='RegisterCard'>
                    <Form className='register-form' onSubmit={this.handleSubmit}>
                        <CardTitle className='text-center'>Opret konto</CardTitle>

                        <FormGroup pb-2>
                            <Label>Fornavn</Label>
                            <Input type='text' name='FirstName' value={this.state.FirstName} onChange={this.handleChange} />
                        </FormGroup>
                        <div style={{ color: 'red', fontSize: 12 }}> {this.state.firstNameError} </div>

                        <FormGroup pb-2>
                            <Label for='Lastname'>Efternavn</Label>
                            <Input type='text' name='LastName' value={this.state.LastName} onChange={this.handleChange} />
                        </FormGroup>
                        <div style={{ color: 'red', fontSize: 12 }}> {this.state.lastNameError} </div>

                        <FormGroup>
                            <Label for='Email'>E-mail</Label>
                            <Input type='email' name='Email' value={this.state.Email} onChange={this.handleChange} />
                        </FormGroup>
                        <div style={{ color: 'red', fontSize: 12 }}> {this.state.emailError} </div>

                        <FormGroup>
                            <Label for='Password'>Adgangskode</Label>
                            <Input type='password' name='Password' value={this.state.Password} onChange={this.handleChange} />
                        </FormGroup>
                        <div style={{ color: 'red', fontSize: 12 }}> {this.state.passwordError} </div>

                        <Button type="submit" color="primary" size='lg' block>Opret konto</Button>
                        <div className='text-center pt-3'>Har du allerede en bruger? </div>
                        <div className='text-center pt-2'>
                            <a id='logA' href='/login'> Log ind </a>
                            <span className='p-2'> | </span>
                            <a href='/login'>  </a>
                        </div>
                    </Form>
                </Card>

            </div>
        )
        
    }



}
