import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl } from 'react-bootstrap';
import ApiCategoryService from "../../services/ApiCategoryService";

// const GridWrapper = styled.div` 
//   margin-top: 1em;
//   margin-left: 12em;
//   margin-right: 6em;
// `;

class AddCategoryComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            categoryCode: "",
            categoryName: "",
            createdBy: 0,
            createdDate : "",
            active: false,
            message: null,    
            formErrors: {}
        }
        this.saveCategory = this.saveCategory.bind(this);
    }

    handleFormValidation() {
        const { categoryCode, categoryName } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //Category Code
        if (!categoryCode || categoryCode === '') {    
            formIsValid = false;    
            formErrors["categoryCodeErr"] = "Category Code is required.";    
        } 

        //Category Code
        if (!categoryName || categoryName === '') {    
            formIsValid = false;    
            formErrors["categoryNameErr"] = "Category Name is required.";    
        } 

        this.setState({ formErrors: formErrors });    
        return formIsValid; 
    }

    saveCategory = (e) => {
        e.preventDefault();
        let category = {categoryCode: this.state.categoryCode, 
                        categoryName: this.state.categoryName, 
                        createdBy: 1, 
                        createdDate: new Date(), 
                        active: true};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            
            ApiCategoryService.addCategory(category)
            .then(res => {
                this.setState({message : 'Category added successfully.'});
                this.props.history.push('/categories');
            });     
        }          
    }

    cancelCategory = (e) => {
        e.preventDefault();
        this.props.history.push('/categories')
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value },
                () => { this.handleFormValidation() });

    render() { 
        const { categoryCodeErr, categoryNameErr } = this.state.formErrors;
        return ( 
            <div className="formDiv">
                <p align="center"><h3>Add Category Information</h3></p>

                <Form>
                    <FormGroup>
                        <FormLabel>Category Code</FormLabel>
                        <FormControl type="text" 
                            placeholder="Category Code" 
                            fullWidth margin="normal" 
                            name="categoryCode" 
                            value={this.state.categoryCode} 
                            onChange={this.onChange}
                            className={categoryCodeErr ? ' showError' : ''} />
                            {categoryCodeErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{categoryCodeErr}</div>}
                    </FormGroup>
                     
                    <FormGroup>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl type="text" 
                            placeholder="Category Name" 
                            fullWidth margin="normal" 
                            name="categoryName" 
                            value={this.state.categoryName} 
                            onChange={this.onChange} 
                            className={categoryNameErr ? ' showError' : ''} />
                            {categoryNameErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{categoryNameErr}</div>}
                    </FormGroup>
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveCategory}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelCategory}>Cancle</Button>
                </Form>
            </div>
         );
    }
}
 
export default AddCategoryComponent;