import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl } from 'react-bootstrap';
import ApiProductService from "../../services/ApiProductService";
import ApiBrandService from "../../services/ApiBrandService";
import ApiCategoryService from "../../services/ApiCategoryService";
import ApiSubCategoryService from "../../services/ApiSubCategoryService";

class AddProductComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            productName: "",
            categoryId: 0,
            subCategoryId: 0,
            brandId: 0,
            modleYear: 2020,
            listPrice: 0,
            active: true,
            message: null,    
            formErrors: {},
            brands: [],
            categories: [],
            subcategories: [],
            filtersubcategories: []
        }
        this.saveProduct = this.saveProduct.bind(this);
    }

    componentDidMount() {
        this.loadProduct();
    }

    async loadProduct() {
        await ApiCategoryService.fetchCategories()
            .then((res) => {
                this.setState({ categories: res.data, isloading: false });
            });

        await ApiSubCategoryService.fetchSubCategories()
            .then((res) => {
                this.setState({ subcategories: res.data, isloading: false });
            });

        await ApiBrandService.fetchBrands()
            .then((res) => {
                this.setState({ brands: res.data, isloading: false });
            });
    }  

    handleFormValidation() {
        const { productName, categoryId, subCategoryId, brandId, modleYear, listPrice } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //Product Code
        if (!productName || productName === '') {    
            formIsValid = false;    
            formErrors["productNameErr"] = "Product Name is required.";    
        } 

        //Category Code
        if (!categoryId || categoryId === '' || (parseInt(Object.values(categoryId)) === 0)) {  
            formIsValid = false;    
            formErrors["categoryIdErr"] = "Category is required.";    
        } 

        //Sub Category Code
        if (!subCategoryId || subCategoryId === '' || (parseInt(Object.values(subCategoryId)) === 0)) {    
            formIsValid = false;    
            formErrors["subCategoryIdErr"] = "Sub Category is required.";    
        } 

        if (!brandId || brandId === '' || (parseInt(Object.values(brandId)) === 0)) {    
            formIsValid = false;    
            formErrors["brandIdErr"] = "Brand is required.";    
        }

        if (!modleYear || modleYear === 0) {    
            formIsValid = false;    
            formErrors["modleYearErr"] = "Model Year is required.";    
        }
        
        if (modleYear.length < 4 || modleYear.length > 4) {    
            formIsValid = false;    
            formErrors["modleYearErr"] = "Not a valid year entered.";    
        }

        if (!listPrice || listPrice === 0) {    
            formIsValid = false;    
            formErrors["listPriceErr"] = "List Pice Year is required.";    
        }

        this.setState({ formErrors: formErrors });    
        return formIsValid; 
    }

    saveProduct = (e) => {
        e.preventDefault();
        let product = {productName: this.state.productName, 
            categoryId: this.state.categoryId,
            subCategoryId: this.state.subCategoryId,
            brandId: this.state.brandId,
            modleYear: this.state.modleYear,
            listPrice: this.state.listPrice, 
            createdBy: 1, 
            createdDate: new Date(), 
            active: true};
        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            
            ApiProductService.addProduct(product)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/products');
            }); 
        }          
    }

    cancelProduct = (e) => {
        e.preventDefault();
        this.props.history.push('/products')
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value },
                () => { this.handleFormValidation() });

    handleChange = name => event => {
        if (name === 'categoryId') {
            this.state.subCategoryId = "0";
            this.filterSubCategory(event.target.value);
        }
        this.setState({ [name]: event.target.value },
            () => { this.handleFormValidation() });                
    }

    filterSubCategory(categoryId) {
        this.state.filtersubcategories = this.state.subcategories.filter(subcateg => subcateg.categoryId === parseInt(categoryId));
    }

    render() { 
        const { productNameErr, categoryIdErr, subCategoryIdErr, brandIdErr, modleYearErr, listPriceErr } = this.state.formErrors;
        return ( 
            <div className="formDiv">
                <p align="center"><h3>Add Product Information</h3></p>

                <Form>
                    <FormGroup>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl type="text" 
                            placeholder="Product Name" 
                            fullWidth margin="normal" 
                            name="productName" 
                            value={this.state.productName} 
                            onChange={this.onChange} 
                            className={productNameErr ? ' showError' : ''} />
                            {productNameErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{productNameErr}</div>}
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

                    <FormGroup>
                        <FormLabel>Sub Category</FormLabel>
                        <FormControl as="select" 
                            placeholder="Sub Category" 
                            fullWidth margin="normal" 
                            name="subCategoryId" 
                            value={this.state.subCategoryId} 
                            onChange={this.handleChange('subCategoryId')} 
                            className={subCategoryIdErr ? ' showError' : ''}>
                            <option key={this.state.categoryId} value={0}>{"--Select Sub Category--"}</option>    
                            {this.state.filtersubcategories.map((subcategory) => 
                                <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>{subcategory.subCategoryName}</option>)
                            }
                        </FormControl> 
                        {subCategoryIdErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{subCategoryIdErr}</div>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Brand</FormLabel>
                        <FormControl as="select" 
                            placeholder="Brand" 
                            fullWidth margin="normal" 
                            name="brandId" 
                            value={this.state.brandId} 
                            onChange={this.handleChange('brandId')} 
                            className={brandIdErr ? ' showError' : ''}>
                            <option key={this.state.categoryId} value={0}>{"--Select Brand--"}</option>    
                            {this.state.brands.map((brand) => 
                                <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>)
                            }
                        </FormControl> 
                        {brandIdErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{brandIdErr}</div>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Modle</FormLabel>
                        <FormControl type="number"
                            placeholder="Modle" 
                            fullWidth margin="normal" 
                            name="modleYear" 
                            value={this.state.modleYear} 
                            onChange={this.onChange} 
                            className={modleYearErr ? ' showError' : ''} />
                            {modleYearErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{modleYearErr}</div>}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Price</FormLabel>
                        <FormControl type="number" 
                            placeholder="Price" 
                            fullWidth margin="normal" 
                            name="listPrice" 
                            value={this.state.listPrice} 
                            onChange={this.onChange} 
                            className={listPriceErr ? ' showError' : ''} />
                            {listPriceErr && 
                            <div style={{ color: "red", paddingBottom: 10 }}>{listPriceErr}</div>}
                    </FormGroup>
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveProduct}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelProduct}>Cancle</Button>
                </Form>
            </div>
         );
    }
}
 
export default AddProductComponent;