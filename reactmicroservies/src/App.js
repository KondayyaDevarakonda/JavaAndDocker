import React, {Component} from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import ListCategoryComponent from './components/category/ListCategoryComponent';
import AddCategoryComponent from './components/category/AddCategoryComponent';
import EditCategoryComponent from './components/category/EditCategoryComponent';
import ListBrandComponent from './components/brand/ListBrandComponent';
import AddBrandComponent from './components/brand/AddBrandComponent';
import EditBrandComponent from './components/brand/EditBrandComponent';
import ListProductComponent from './components/product/ListProductComponent';
import AddProductComponent from './components/product/AddProductComponent';
import EditProductComponent from './components/product/EditProductComponent';
import ListSubCategoryComponent from './components/subcategory/ListSubCategoryComponent';
import AddSubCategoryComponent from './components/subcategory/AddSubCategoryComponent';
import EditSubCategoryComponent from './components/subcategory/EditSubCategoryComponent';
import LoginUser from './components/user/LoginUser';
import SignUpUser from './components/user/SignUpUser';
import LogOutUser from './components/user/LogOutUser';
import { NavigationBar } from './components/NavigationBar';
import Sidebar from './components/SideBar';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import ApiAuthenticationService from "./services/ApiAuthenticationService";
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
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />        

        <Sidebar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />

          <Route exact path="/login-user" component={LoginUser} />
          <Route exact path="/signup-user" component={SignUpUser} />
          {/* <Route exact path="/logout-user" component={LogOutUser} /> */}

          <Route path="/categories" component={ListCategoryComponent} />
          <Route path="/add-category" component={AddCategoryComponent} />
          <Route path="/edit-category" component={EditCategoryComponent} />

          <Route path="/subcategories" component={ListSubCategoryComponent} />
          <Route path="/add-subcategory" component={AddSubCategoryComponent} />
          <Route path="/edit-subcategory" component={EditSubCategoryComponent} />
           
          <Route path="/brands" component={ListBrandComponent} />
          <Route path="/add-brand" component={AddBrandComponent} />
          <Route path="/edit-brand" component={EditBrandComponent} />

          <Route path="/products" component={ListProductComponent} />
          <Route path="/add-product" component={AddProductComponent} />
          <Route path="/edit-product" component={EditProductComponent} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
}

export default App;
