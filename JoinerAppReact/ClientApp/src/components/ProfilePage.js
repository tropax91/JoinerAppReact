import React, { Component } from 'react';
import { Button, Container, Row, Col, Card} from 'reactstrap';
import { OrdersTable } from './OrdersTable';
import { ShapesTable } from './ShapesTable';




export class ProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            userIsLoggedIn: false
        };
    }

    
    componentDidMount() {

        fetch('https://localhost:44359/api/Account/UserProfile')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    userIsLoggedIn: true,
                    user: result
                })
            },
                (error) => {
                    console.log('Error retrieving the user details ', error)
                }
            )
    }



    render() {
        var { userIsLoggedIn, user } = this.state;

        if (!userIsLoggedIn) {
            return <div>Please log in to view this page!</div>
        }
        else {
            return (
                <div>
                    <Container>
                        <Row>
                            <Col>
                            <h2 className='ProfileHead text-center'> User Profile</h2>
                          <div class="container emp-profile">
                            <form method="post">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="profile-img">
                                            <img src="" alt="" />
                                        
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="profile-head">
                                            <h5>
                                                Hello {this.state.user.firstName}!
                                        </h5>
                                            <h6>
                                                VIP Customer
                                        </h6>
                                            <p class="proile-rating">Status : <span>Active</span></p>
                                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item">
                                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                            <div class="col-md-2">
                                                <Button a href='/edituser' outline color='secondary' size='sm' class="profile-edit-btn" name="btnAddMore" >Edit Profile</Button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="profile-work">
                                            <p>My Account</p>
                                            <a href="/admin">My Orders</a><br />
                                            <a href="">Shopping Cart</a><br />
                                            <a href="">Watchlist</a>                                        
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="tab-content profile-tab" id="myTabContent">
                                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label>First name:</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{this.state.user.firstName}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label>Last name:</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{this.state.user.lastName}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label>Email:</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{this.state.user.email}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label>Address:</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p></p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </form>
                                </div>
                            </Col>                            
                        </Row>
                        <Row>
                            <Col>
                                <h2 className='ProfileHead text-center'>Your Order Details</h2>
                                <div class="container emp-profile">
                                    <OrdersTable />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 className='ProfileHead text-center'>Shapes</h2>
                                <div class="container emp-profile">
                                    <ShapesTable />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                
            )
        }
    }
}

