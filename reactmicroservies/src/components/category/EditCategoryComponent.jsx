import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import '../GenericForm.css';
import ApiCategoryService from "../../services/ApiCategoryService";

// const GridWrapper = styled.div` 
//   margin-top: 1em;
//   margin-left: 12em;
//   margin-right: 6em;
// `;

class EditCategoryComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            categoryCode: "",
            categoryName: "",
            active: true,    
            formErrors: {}
        }
        this.saveCategory = this.saveCategory.bind(this);
        this.loadCategory = this.loadCategory.bind(this);
    }

    async componentDidMount() {
        this.loadCategory();
    }

    loadCategory() {
        ApiCategoryService.fetchCategoryById(window.localStorage.getItem("categoryId"))
        .then((res) => {
            let data = res.data;
            this.setState({ categoryCode: data.categoryCode, categoryName: data.categoryName, active: data.active})
        });
    } 

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value },
            () => { this.handleFormValidation() });

    handleFormValidation() {
        const { categoryName } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

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
        let category = {categoryId: window.localStorage.getItem("categoryId"), categoryCode: this.state.categoryCode, categoryName: this.state.categoryName, createdBy: "1", createdDate : new Date(), active: this.state.active};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            if (category.categoryId) {
                this.setStateEidtDelete(1);
                ApiCategoryService.editCategory(category)
                .then(res => {
                    this.setState({message : 'User added successfully.'});
                    this.props.history.push('/categories');
                });
            }
        }
    }

    cancelCategory = (e) => {
        e.preventDefault();
        this.setStateEidtDelete(1);
        this.props.history.push('/categories')
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    setStateEidtDelete(value) {
        localStorage.setItem( 'StateEidtDelete', value );
        this.setState( { stateEidtDelete: value } );
    } 
    
    render() { 
        const { categoryNameErr } = this.state.formErrors;
        return ( 
            <div className="formDiv">
                <p align="center"><h3>Edit Category Information</h3></p>

                <Form>
                    <FormGroup>
                        <FormLabel>Category Code</FormLabel>
                        <FormControl type="text" placeholder="Category Code" fullWidth margin="normal" name="categoryCode" disabled={true} value={this.state.categoryCode}></FormControl>
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

                    <FormGroup>
                        <FormCheck label="Active" name="active" checked={this.state.active} onChange={this.handleChange('active')} value="active"/>
                    </FormGroup>
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveCategory}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelCategory}>Cancle</Button>
                </Form>

            </div>
         );
    }    
}
 
export default EditCategoryComponent;