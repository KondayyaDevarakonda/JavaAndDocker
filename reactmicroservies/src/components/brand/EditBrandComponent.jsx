import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import '../GenericForm.css';
import ApiBrandService from "../../services/ApiBrandService";

// const GridWrapper = styled.div` 
//   margin-top: 1em;
//   margin-left: 12em;
//   margin-right: 6em;
// `;

class EditBrandComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            brandName: "",
            active: true,    
            formErrors: {}
        }
        this.saveBrand = this.saveBrand.bind(this);
        this.loadBrand = this.loadBrand.bind(this);
    }

    async componentDidMount() {
        this.loadBrand();
    }

    loadBrand() {
        ApiBrandService.fetchBrandById(window.localStorage.getItem("brandId"))
        .then((res) => {
            let data = res.data;
            this.setState({ brandCode: data.brandCode, brandName: data.brandName, active: data.active})
        });
    } 

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value },
            () => { this.handleFormValidation() });

    handleFormValidation() {
        const { brandName } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //Brand Name
        if (!brandName || brandName === '') {    
            formIsValid = false;    
            formErrors["brandNameErr"] = "Brand Name is required.";    
        } 

        this.setState({ formErrors: formErrors });    
        return formIsValid; 
    }

    saveBrand = (e) => {
        e.preventDefault();
        let brand = {brandId: window.localStorage.getItem("brandId"), brandName: this.state.brandName, createdBy: "1", createdDate : new Date(), active: this.state.active};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            if (brand.brandId) {
                this.setStateEidtDelete(1);
                ApiBrandService.editBrand(brand)
                .then(res => {
                    this.setState({message : 'User added successfully.'});
                    this.props.history.push('/brands');
                });
            }
        }
    }

    cancelBrand = (e) => {
        e.preventDefault();
        this.setStateEidtDelete(1);
        this.props.history.push('/brands')
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    setStateEidtDelete(value) {
        localStorage.setItem( 'StateEidtDelete', value );
        this.setState( { stateEidtDelete: value } );
    }
    
    render() { 
        const { brandNameErr } = this.state.formErrors;
        return ( 
            <div className="formDiv">
                <p align="center"><h3>Edit Brand Information</h3></p>

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

                    <FormGroup>
                        <FormCheck label="Active" name="active" checked={this.state.active} onChange={this.handleChange('active')} value="active"/>
                    </FormGroup>
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveBrand}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelBrand}>Cancle</Button>
                </Form>

            </div>
         );
    }    
}
 
export default EditBrandComponent;