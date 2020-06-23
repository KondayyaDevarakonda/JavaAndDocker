import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import ApiAuthenticationService from "../services/ApiAuthenticationService";

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    };
  }  

  componentDidMount() {
    const user = ApiAuthenticationService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    ApiAuthenticationService.logoutUser();
  }

  render() {
    const { currentUser } = this.state;
      return (   
           
        <Styles>
          <Navbar expand="lg">
            <Navbar.Brand href="/">Home</Navbar.Brand>
                      
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                 {currentUser ? (
                    <Nav.Item><Nav.Link href="/login-user" onClick={this.logOut}>{!currentUser || currentUser === null ? "" : currentUser.username} Log Out</Nav.Link></Nav.Item>
                    ) : (
                        <Nav.Item><Nav.Link href={'/login-user'}>Login</Nav.Link></Nav.Item>                       
                    ) }                
                 {!currentUser ? (
                    <Nav.Item><Nav.Link href={'/login-user'}>Sign Up</Nav.Link></Nav.Item>
                    ) : ("")
                  }
                 <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Styles>  
      );  
    
  }
}