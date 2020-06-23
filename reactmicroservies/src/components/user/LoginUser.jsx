import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl } from 'react-bootstrap';
import ApiAuthenticationService from "../../services/ApiAuthenticationService";
import Apps from '../../App';

class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName: "",
            password: "",
            loading: false,
            message: null,    
            formErrors: {}
         }
    }

    handleFormValidation() {
        const { userName, password } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //User Name
        if (!userName || userName === '') {    
            formIsValid = false;    
            formErrors["userNameErr"] = "User Name is required.";    
        } 

        //Category Code
        if (!password || password === '') {    
            formIsValid = false;    
            formErrors["passwordErr"] = "Password is required.";    
        }

        this.setState({ formErrors: formErrors });    
        return formIsValid;
    }

    loginUser = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
          });

        let user = {userName: this.state.userName, 
                        password: this.state.password};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {    
           ApiAuthenticationService.loginUser(user.userName, user.password)
           .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
      
                this.setState({message : 'Login sucessfull'});
                this.props.history.push('/');
                window.location.reload();
                
            },
            error => {
              const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                loading: false,
                message: resMessage
              });
            });   
        } else {
            this.setState({
              loading: false
            });
          } 
    }

    cancelLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value },
                () => { this.handleFormValidation() });

    render() { 
        const { userNameErr, passwordErr } = this.state.formErrors;
        const currentUser = ApiAuthenticationService.getCurrentUser();
        return ( 
            
            <div className="formDiv" >   
                <div>{!currentUser || currentUser === '' ? "" : currentUser.username}</div>
                 {this.state.message && 
                            <div style={{ color: "red", paddingBottom: 10 }}>Invalid User Name or Password</div>}
                <img style={{height:"20%",width:"30%",padding:"0% 10%"}}
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card" />
                
                <Form style={{width:"100%",padding:"0% 10%"}}>
                    <FormGroup style={{width:"30%"}}>
                        <FormLabel>User Name</FormLabel>
                        <FormControl 
                            type="text" 
                            placeholder="User Name"                              
                            name="userName" 
                            value={this.state.categoryCode} 
                            onChange={this.onChange}
                            className={userNameErr ? ' showError' : ''}/>
                            {userNameErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{userNameErr}</div>}
                    </FormGroup>

                    <FormGroup style={{width:"30%"}}>
                        <FormLabel>Password</FormLabel>
                        <FormControl 
                            type="password" 
                            placeholder="Password" 
                            margin="normal" 
                            name="password" 
                            value={this.state.password} onChange={this.onChange}
                            className={passwordErr ? ' showError' : ''}/>
                            {passwordErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{passwordErr}</div>}
                    </FormGroup>

                    <Button variant="contained" size="sm" color="primary" onClick={this.loginUser}>Login</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelLogin}>Cancle</Button>
                </Form>
            </div>
         );
    }
}
 
export default LoginUser;