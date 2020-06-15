import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
//import { Layout } from './components/Layout';
import { Home } from './components/Home';
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

import { NavigationBar } from './components/NavigationBar';
import Sidebar from './components/SideBar';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />

        <Sidebar />

        <Switch>
          <Route exact path="/" component={Home} />
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
  // return (
  //     <div>
  //     <Layout>
  //       <Router> 
         
  //           <Route exact path='/' component={Home} />
  //           <Route path="/categories" component={ListCategoryComponent} />
  //           <Route path="/add-category" component={AddCategoryComponent} />
  //           <Route path="/edit-category" component={EditCategoryComponent} />
         
  //       </Router>       
  //     </Layout>
  //     </div>
  // );
}

export default App;
