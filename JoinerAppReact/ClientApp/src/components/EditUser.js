import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import { Label, Input } from 'reactstrap';





export class EditUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            FirstName: '',
            LastName: '',
            Password: '',
            NewPassword:'',
            user: {},
            userIsLoggedIn: false
        };

        this.handleChange = this.handleChange.bind(this);  
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentWillMount() {

        fetch('https://localhost:44359/api/Account/UserProfile')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    userIsLoggedIn: true,
                    FirstName: result.firstName,
                    LastName: result.lastName,
                    Password: '',
                })
            },
                (error) => {
                    console.log('Error retrieving the user details ', error)
                }
            )
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('https://localhost:44359/api/Account/UpdateUser', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(Response => {
                if (Response.status === 200) {
                    this.props.history.push("/ProfilePage")
                    this.props.displayPopover("Your credentials have been updated!");
                }
                else if (Response.status === 404) {
                    this.props.displayPopover("Current password doesn't match!");
                }
            })
        
    }


    render() {
        var { userIsLoggedIn, user } = this.state;

        if (!userIsLoggedIn) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div>
                    <Card className='RegisterCard'>

                        <form className='register-form' onSubmit={this.handleSubmit}>
                            <CardTitle className='text-center'>Edit Profile</CardTitle>
                            <div className='input-field'>
                                <Label className='FNL'>First name</Label>
                                <Input className='Inputz' type='text' name='FirstName' value={this.state.FirstName} onChange={this.handleChange} />
                        </div>
                        <div className='input-field'>
                                <Label className='FNL'>Last name</Label>
                                <Input className='Inputz' type='text' name='LastName' value={this.state.LastName} onChange={this.handleChange} />
                        </div>
                        <div className='input-field pb-2'>
                                <Label className='FNL'>Current Password</Label>
                                <Input className='Inputz' type='password' name='Password' value={this.state.Password} onChange={this.handleChange} />
                        </div>
                        <div className='input-field pb-2'>
                                <Label className='FNL'>New Password</Label>
                                <Input className='Inputz' type='password' name='NewPassword' value={this.state.NewPassword} onChange={this.handleChange} />
                        </div>
                            <Button type="submit" color="success" size='lg' block> Save </Button>

                        




                    </form>
                   </Card>

                </div>

            )
        }
    }
}

