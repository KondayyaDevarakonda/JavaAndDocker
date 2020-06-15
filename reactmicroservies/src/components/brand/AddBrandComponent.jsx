import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl } from 'react-bootstrap';
import ApiBrandService from "../../services/ApiBrandService";

// const GridWrapper = styled.div` 
//   margin-top: 1em;
//   margin-left: 12em;
//   margin-right: 6em;
// `;

class AddBrandComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            brandName: "",
            createdBy: 0,
            createdDate : "",
            active: false,
            message: null,    
            formErrors: {}
        }
        this.saveBrand = this.saveBrand.bind(this);
    }

    handleFormValidation() {
        const { brandName } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //Brand Code
        if (!brandName || brandName === '') {    
            formIsValid = false;    
            formErrors["brandNameErr"] = "Brand Name is required.";    
        } 

        this.setState({ formErrors: formErrors });    
        return formIsValid; 
    }

    saveBrand = (e) => {
        e.preventDefault();
        let brand = {brandName: this.state.brandName, createdBy: 1, createdDate: new Date(), active: true};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            
            ApiBrandService.addBrand(brand)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/brands');
            });     
        }          
    }

    cancelBrand = (e) => {
        e.preventDefault();
        this.props.history.push('/brands')
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value },
                () => { this.handleFormValidation() });

    render() { 
        const {  brandNameErr } = this.state.formErrors;
        return ( 
            <div className="formDiv">
                <p align="center"><h3>Add Brand Information</h3></p>

                <Form>
                                         
                    <FormGroup>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl type="text" 
                            placeholder="Brand Name" 
                            fullWidth margin="normal" 
                            name="brandName" 
                            value={this.state.brandName} 
                            onChange={this.onChange} 
                            className={brandNameErr ? ' showError' : ''} />
                            {brandNameErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{brandNameErr}</div>}
                    </FormGroup>
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveBrand}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelBrand}>Cancle</Button>
                </Form>
            </div>
         );
    }
}
 
export default AddBrandComponent;