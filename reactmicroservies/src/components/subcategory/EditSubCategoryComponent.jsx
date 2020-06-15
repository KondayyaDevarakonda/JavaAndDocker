import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import '../GenericForm.css';
import ApiSubCategoryService from "../../services/ApiSubCategoryService";
import ApiCategoryService from "../../services/ApiCategoryService";

class EditSubCategoryComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            subCategoryCode: "",
            subCategoryName: "",
            categoryId: 0,
            isActive: true,    
            formErrors: {},
            categories: [],
        }
        this.saveSubCategory = this.saveSubCategory.bind(this);
        this.loadSubCategory = this.loadSubCategory.bind(this);
    }

    async componentDidMount() {
        this.loadSubCategory();
    }

    loadSubCategory() {
        ApiSubCategoryService.fetchSubCategoryById(window.localStorage.getItem("subCategoryId"))
        .then((res) => {
            let data = res.data;
            this.setState({ subCategoryCode: data.subCategoryCode, subCategoryName: data.subCategoryName, categoryId: data.categoryId, isActive: data.isActive})
        });

        ApiCategoryService.fetchCategories()
        .then((res) => {
            this.setState({ categories: res.data, isloading: false });
        });
    } 

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value },
            () => { this.handleFormValidation() });

    handleFormValidation() {
        const { subCategoryName } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //SubCategory Code
        if (!subCategoryName || subCategoryName === '') {    
            formIsValid = false;    
            formErrors["subCategoryNameErr"] = "SubCategory Name is required.";    
        } 

        this.setState({ formErrors: formErrors });    
        return formIsValid; 
    }

    saveSubCategory = (e) => {
        e.preventDefault();
        let subCategory = {subCategoryId: window.localStorage.getItem("subCategoryId"), 
                            subCategoryCode: this.state.subCategoryCode, 
                            subCategoryName: this.state.subCategoryName, 
                            categoryId: this.state.categoryId, 
                            createdBy: "1", 
                            createdDate : new Date(), 
                            isActive: this.state.isActive};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            if (subCategory.subCategoryId) {
                this.setStateEidtDelete(1);
                ApiSubCategoryService.editSubCategory(subCategory)
                .then(res => {
                    this.setState({message : 'Sub Category added successfully.'});
                    this.props.history.push('/subcategories');
                });
            }
        }
    }    

    cancelSubCategory = (e) => {
        e.preventDefault();
        this.setStateEidtDelete(1);
        this.props.history.push('/subcategories')
    }

    handleChange = name => event => {
        if(name === 'active') {
            this.setState({ [name]: event.target.checked });
        } else {
            this.setState({ [name]: event.target.value });
        }        
    };

    setStateEidtDelete(value) {
        localStorage.setItem( 'StateEidtDelete', value );
        this.setState( { stateEidtDelete: value } );
    }    
    
    render() { 
        const { subCategoryNameErr } = this.state.formErrors;
        return ( 
            <div className="formDiv">
                <p align="center"><h3>Edit SubCategory Information</h3></p>

                <Form>
                    <FormGroup>
                        <FormLabel>SubCategory Code</FormLabel>
                        <FormControl type="text" placeholder="SubCategory Code" fullWidth margin="normal" name="subCategoryCode" disabled={true} value={this.state.subCategoryCode}></FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>SubCategory Name</FormLabel>
                        <FormControl type="text" 
                            placeholder="SubCategory Name" 
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
                            onChange={this.handleChange('categoryId')} >
                            {this.state.categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)}
                        </FormControl> 
                    </FormGroup>

                    <FormGroup>
                        <FormCheck label="Active" name="isActive" checked={this.state.isActive} onChange={this.handleChange('isActive')} value="isActive"/>
                    </FormGroup>
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveSubCategory}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelSubCategory}>Cancle</Button>
                </Form>

            </div>
         );
    }    
}
 
export default EditSubCategoryComponent;