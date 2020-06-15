import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import '../GenericForm.css';
import ApiProductService from "../../services/ApiProductService";
import ApiBrandService from "../../services/ApiBrandService";
import ApiCategoryService from "../../services/ApiCategoryService";
import ApiSubCategoryService from "../../services/ApiSubCategoryService";

class EditProductComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            productName: "",
            categoryId: 0,
            subCategoryId: 0,
            brandId: 0,
            modleYear: 0,
            listPrice: 0,
            active: true,    
            formErrors: {},
            brands: [],
            categories: [],
            subcategories: [],
            filtersubcategories: []
        }
        this.saveProduct = this.saveProduct.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
    }

    componentDidMount() {
        this.loadProduct();        
    }

    async loadProduct() {
        await ApiProductService.fetchProductById(window.localStorage.getItem("productId"))
            .then((res) => {
                let data = res.data;
                this.setState({ productName: data.productName, 
                        categoryId: data.categoryId,
                        subCategoryId: data.subCategoryId,
                        brandId: data.brandId,
                        modleYear: data.modleYear,
                        listPrice: data.listPrice,
                        active: data.active,
                });                
        });

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

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value },
            () => { this.handleFormValidation() });

    handleFormValidation() {
        const { productName, brandId, categoryId, modleYear, listPrice } = this.state;    
        let formErrors = {};    
        let formIsValid = true; 

        //Product Code
        if (!productName || productName === '') {    
            formIsValid = false;    
            formErrors["productNameErr"] = "Product Name is required.";    
        } 

        if (!brandId || brandId === 0) {    
            formIsValid = false;    
            formErrors["brandIdErr"] = "Please Select Brand.";    
        } 

        if (!categoryId || categoryId === 0) {    
            formIsValid = false;    
            formErrors["categoryIdErr"] = "Please Select Cateogry.";    
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
        let product = {productId: window.localStorage.getItem("productId"), 
                        productName: this.state.productName,
                        categoryId: this.state.categoryId,
                        subCategoryId: this.state.subCategoryId,
                        brandId: this.state.brandId,
                        modleYear: this.state.modleYear,
                        listPrice: this.state.listPrice, 
                        createdBy: "1", createdDate : new Date(), 
                        active: this.state.active};

        let formIsValid = this.handleFormValidation()
        if (formIsValid) {
            if (product.productId) {
                this.setStateEidtDelete(1);
                ApiProductService.editProduct(product)
                .then(res => {
                    this.setState({message : 'Product added successfully.'});
                    this.props.history.push('/products');
                });
            }
        }
    }

    cancelProduct = (e) => {
        e.preventDefault();
        this.setStateEidtDelete(1);
        this.props.history.push('/products')
    }

    setStateEidtDelete(value) {
        localStorage.setItem( 'StateEidtDelete', value );
        this.setState( { stateEidtDelete: value } );
    }

    handleChange = name => event => {        
        if(name === 'active') {
            this.setState({ [name]: event.target.checked });
        } else {
            this.setState({ [name]: event.target.value });
        }   
        this.filterSubCategory(event.target.value);
    };

    filterSubCategory(categoryId) {
        this.state.filtersubcategories = this.state.subcategories.filter(subcateg => subcateg.categoryId === parseInt(categoryId));
    }
    
    render() { 
        const { productNameErr, categoryIdErr, subCategoryIdErr, brandIdErr, modleYearErr, listPriceErr } = this.state.formErrors;
        this.filterSubCategory(this.state.categoryId);        
        return ( 
            <div className="formDiv">
                <p align="center"><h3>Edit Product Information</h3></p>

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
                            onChange={this.handleChange('categoryId')} >
                        {this.state.categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)}
                        </FormControl> 
                    </FormGroup>
                    {this.state.categoryId}
                    <FormGroup>
                        <FormLabel>Sub Category</FormLabel>
                        <FormControl as="select" 
                            placeholder="Sub Category" 
                            fullWidth margin="normal" 
                            name="subCategoryId" 
                            value={this.state.subCategoryId} 
                            onChange={this.handleChange('subCategoryId')} >
                            {this.state.filtersubcategories.map((subcategory) => <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>{subcategory.subCategoryName}</option>)}
                        </FormControl> 
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Brand</FormLabel>
                        <FormControl as="select" 
                            placeholder="Brand" 
                            fullWidth margin="normal" 
                            name="brandId" 
                            value={this.state.brandId} 
                            onChange={this.handleChange('brandId')} >
                            {this.state.brands.map((brand) => <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>)}
                        </FormControl> 
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

                    <FormGroup>
                        <FormCheck label="Active" 
                            name="active" 
                            checked={this.state.active} 
                            onChange={this.handleChange('active')} 
                            value="active"/>
                    </FormGroup>
                    
                    <Button variant="contained" size="sm" color="primary" onClick={this.saveProduct}>Save</Button>{' '}
                    <Button variant="contained" size="sm" color="primary" onClick={this.cancelProduct}>Cancle</Button>
                </Form>
            </div>
         );
    }
    
}
 
export default EditProductComponent;