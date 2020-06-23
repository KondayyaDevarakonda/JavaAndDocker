import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8185/api/auth/';

class ApiAuthenticationService {

    loginUser(username, password) {
        return axios.post(USER_API_BASE_URL + 'signin', {username, password});
    }

    registerUser(username, email, password) {
        return axios.post(USER_API_BASE_URL + 'signup', {username, email, password});
    }

    logoutUser() {
        //localStorage.removeItem("user");
        console.log("logout triggered");
        localStorage.setItem("user", "");
    }

    getCurrentUser() {        
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        }         
    }

}

export default new ApiAuthenticationService();