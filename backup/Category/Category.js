import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import CategoryList from './CategoryList';

const cateogryList = [{id:1,name:'John Doe',grade:1,school:'React Redux School'},{id:2,name:'Jane Doe',grade:2,school:'React Redux School'}
,{id:3,name:'Terry Adams',grade:3,school:'React Redux School'},{id:4,name:'Jenny Smith',grade:4,school:'React Redux School'}];

if (localStorage.getItem("categorys") === null)
  localStorage.setItem('categorys', JSON.stringify(cateogryList));

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: []
    }
    this.editCategorySubmit = this.editCategorySubmit.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
  }
  componentWillMount() {
    let categoryList = JSON.parse(localStorage.getItem("categorys"));

    this.setState((prevState, props) => (
      {
        categoryList: categoryList
      }
    )
    );
  }
  addNewCategory() {
    this.setState((prevState, props) => ({

      categoryList: [...prevState.categoryList, { id:Math.max(...prevState.categoryList.map(function(o){return o.id})) + 1,name: '', grade: 1, school: '' }]

    }));
  }

  deleteCategory(id) {
    let r = window.confirm("Do you want to delete this item");
    if (r === true) {
      let filteredCategoryList = this.state.categoryList.filter(x => x.id !== id);

      this.setState((prevState, props) => ({
        categoryList: filteredCategoryList
      }));
      localStorage.setItem('categorys', JSON.stringify(filteredCategoryList));
    }
  }
  editCategorySubmit(id,name, grade, school) {
    let categoryListCopy = this.state.categoryList.map((category) => {
      if (category.id === id) {
        category.name = name;
        category.grade = grade;
        category.school = school;
      }
      return category;
    });
    this.setState((prevState, props) => ({
      categoryList: categoryListCopy
    }));
    localStorage.setItem('categorys', JSON.stringify(categoryListCopy));
  }
  render() {
    return (

      <div className="container-fluid">
        <div className="row mt-3"><div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              Category Registry
  </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead className="thead-dark"><tr><th>Name</th><th>Grade</th><th>School</th><th>Edit/Save</th><th>Delete</th></tr></thead>
                <CategoryList deleteCategory={this.deleteCategory} categoryList={this.state.categoryList} editCategorySubmit={this.editCategorySubmit} />
              </table>
              <button className="btn btn-dark pull-left" onClick={this.addNewCategory}>Add New</button>
            </div></div></div></div></div>
    );
  }
}

export default Category;
