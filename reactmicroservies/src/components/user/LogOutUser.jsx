import React, { Component } from 'react';
import ApiAuthenticationService from "../../services/ApiAuthenticationService";

class LogOutUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect: false,
         }
    }

    componentDidMount() {
        //sessionStorage.setItem("userToken", '');
        //sessionStorage.clear();
        this.setState({ redirect: true });
        this.logOut();
    }

    async logOut() {
        localStorage.removeItem("user");
        ApiAuthenticationService.logoutUser();
        this.props.history.push('/login-user');
      }

    render() { 
        return this.state.redirect ? this.logOut() : null;           
    }
}
 
export default LogOutUser;