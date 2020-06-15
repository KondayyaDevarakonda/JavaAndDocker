import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl } from 'react-bootstrap';
import ApiSubCategoryService from "../../services/ApiSubCategoryService";
import ApiCategoryService from "../../services/ApiCategoryService";

class AddSubCategoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            subCategoryCode: "",
            subCategoryName: "",
            categoryId: 0,
            isActive: true,    
            formErrors: {},
            categories: []
        }
        this.saveSubCategory = this.saveSubCategory.bind(this);
    }

    componentDidMount() {
        this.loadSubCategory();
    }

    async loadSubCategory() {
        await ApiCategoryService.fetchCategories()
        .then((res) => {
            this.setState({ categories: res.data, isloading: false });
        });
    } 

    handleFormValidation() {
        const { subCategoryCode, subCategoryName, categoryId } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //Sub Category Code
        if (!subCategoryCode || subCategoryCode === '') {    
            formIsValid = false;    
            formErrors["subCategoryCodeErr"] = "Sub Category Code is required.";    
        } 

        //Sub Category Name
        if (!subCategoryName || subCategoryName === '') {    
            formIsValid = false;    
            formErrors["subCategoryNameErr"] = "Sub Category Name is required.";    
        } 

        //Category Code
        if (!categoryId || categoryId === '' || (parseInt(Object.values(categoryId)) === 0)) {    
            formIsValid = false;    
            formErrors["categoryIdErr"] = "Category is required.";    
        } 

        this.setState({ formErrors: formErrors });    
        return formIsValid; 
    }

    saveSubCategory = (e) => {
        e.preventDefault();

        let subCategory = {subCategoryCode: this.state.subCategoryCode, 
                        subCategoryName: this.state.subCategoryName, 
                        categoryId: this.state.categoryId, 
                        createdBy: "1", 
                        createdDate : new Date(), 
                        isActive: true};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            
            ApiSubCategoryService.addSubCategory(subCategory)
            .then(res => {
                this.setState({message : 'Sub Category added successfully.'});
                this.props.history.push('/subcategories');
            });     
        }          
    }

    cancelSubCategory = (e) => {
        e.preventDefault();
        this.props.history.push('/subcategories')
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value },
        () => { this.handleFormValidation() });

    handleChange = name => event => {
        this.setState({ [name]: event.target.value },
            () => { this.handleFormValidation() });
    };

    render() { 
        const { subCategoryCodeErr, subCategoryNameErr, categoryIdErr } = this.state.formErrors;

        return ( 
            <div className="formDiv">
                <p align="center"><h3>Add Category Information</h3></p>

                <Form>
                    <FormGroup>
                        <FormLabel>Sub Category Code</FormLabel>
                        <FormControl type="text" 
                            placeholder="Sub Category Code" 
                            fullWidth margin="normal" 
                            name="subCategoryCode" 
                            value={this.state.subCategoryCode} 
                            onChange={this.onChange}
                            className={subCategoryCodeErr ? ' showError' : ''} />
                            {subCategoryCodeErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{subCategoryCodeErr}</div>}
                    </FormGroup>
                     
                    <FormGroup>
                        <FormLabel>Sub Category Name</FormLabel>
                        <FormControl type="text" 
                            placeholder="Sub Category Name" 
                            fullWidth margin="normal" 
                            name="subCategoryName" 
                            value={this.state.subCategoryName} 
                            onChange={this.onChange} 
                            className={subCategoryNameErr ? ' showError' : ''} />
                            {subCategoryNameErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{subCategoryNameErr}</div>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Category</FormLabel>
                        <FormControl as="select" 
                            placeholder="Category" 
                            fullWidth margin="normal" 
                            name="categoryId" 
                            value={this.state.categoryId} 
                            onChange={this.handleChange('categoryId')} 
                            className={categoryIdErr ? ' showError' : ''}>
                            <option key={this.state.categoryId} value={0}>{"--Select Category--"}</option>    
                            {this.state.categories.map((category) => 
                                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                )
                            }
                        </FormControl> 
                        {categoryIdErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{categoryIdErr}</div>}
                    </FormGroup>                    
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveSubCategory}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelSubCategory}>Cancle</Button>
                </Form>
            </div> 
        );
    }
}
 
export default AddSubCategoryComponent;