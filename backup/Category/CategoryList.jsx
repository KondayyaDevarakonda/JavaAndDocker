import React, { Component } from 'react';
import CategoryItem from './CategoryItem.jsx';

export default class CategoryList extends Component {
    render() {
        let categorys = this.props.categoryList;
        const trItem = categorys.map( (item,index) => <CategoryItem key={index} category={item} index={index} editCategorySubmit={this.props.editCategorySubmit} deleteCategory={this.props.deleteCategory}/>)
      return (
            <tbody>{trItem}</tbody>
      );
    }
  }