import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }


    render () {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                    <Container>
                        <NavbarBrand tag={Link} to="/"><img src="/Joiner-logo-sort-07.png" alt="Logo" /></NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/">Hjem</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/designer">Designer</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-light" to="/createorder">Opret Ordre</NavLink>
                    </NavItem>
                    {this.props.userIsLoggedIn &&
                        <NavItem>
                            <NavLink tag={Link} className="text-light" to="/Admin">Admin</NavLink>
                        </NavItem>
                    }
                    {!this.props.userIsLoggedIn &&
                        <NavItem>
                            <NavLink tag={Link} className="text-light" to="/login">Log Ind</NavLink>
                        </NavItem>
                    }
                    {!this.props.userIsLoggedIn &&
                        <NavItem>
                            <NavLink tag={Link} className="text-light" to="/register">Opret Bruger</NavLink>
                        </NavItem>
                    }
                    {this.props.userIsLoggedIn &&
                        <NavItem>
                            <NavLink tag={Link} className="text-light" to="/" onClick={() => this.props.handleLogout()}>Log Ud</NavLink>
                        </NavItem>
                    }
                     {this.props.userIsLoggedIn &&
                        <NavItem>
                            <NavLink tag={Link} className="text-light" to="/profilepage">Profil</NavLink>
                        </NavItem> 
                      }  
                                
                    </ul>
                </Collapse>
                </Container>
            </Navbar>
            </header>
        );
    }
}
