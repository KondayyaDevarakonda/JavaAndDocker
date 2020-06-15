import React, { Component } from 'react';


export default class CategoryItem extends Component {
  constructor(props)
  {
    super(props);
    this.state ={isEdit:false}
    this.editCategory = this.editCategory.bind(this);
    this.editCategorySubmit = this.editCategorySubmit.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }
  deleteCategory()
  {
    const {id} = this.props.category;
this.props.deleteCategory(id);
  }
  editCategory()
  {
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }))
  }
  editCategorySubmit()
  {
    const {id} = this.props.category;
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }));
    this.props.editCategorySubmit(id,this.nameInput.value,this.gradeInput.value,this.schoolInput.value);
  }
    render() {
        const {name,grade,school} = this.props.category;
      return (
        this.state.isEdit === true ? 

        <tr className="bg-warning" key={this.props.index}><td><input ref={nameInput => this.nameInput = nameInput} defaultValue ={name}/></td><td><input defaultValue={grade} ref={gradeInput => this.gradeInput = gradeInput}/></td><td><input ref={schoolInput => this.schoolInput = schoolInput} defaultValue={school}/></td><td><i className="far fa-save" onClick={this.editCategorySubmit}></i></td><td><i className="fas fa-trash"></i></td></tr>
 :
        <tr key={this.props.index}><td>{name}</td><td>{grade}</td><td>{school}</td><td><i className="far fa-edit" onClick={this.editCategory}></i></td><td><i className="fas fa-trash" onClick={this.deleteCategory}></i></td></tr>
      );
    }
  }
