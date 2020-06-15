import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'reactstrap';
import ApiProductService from "../../services/ApiProductService";
import ApiBrandService from "../../services/ApiBrandService";
import ApiCategoryService from "../../services/ApiCategoryService";
import ApiSubCategoryService from "../../services/ApiSubCategoryService";
import Pagination from '../Pagination';
import SortUtitlityService from '../../utility/SortUtitlityService';
import UpArrow from '../../icons/UpArrow.png';
import DownArrow from '../../icons/DownArrow.png';

const GridWrapper = styled.div` 
  margin-top: 1em;
  margin-left: 12em;
  margin-right: 6em;
`;

class ListProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: [],
            message: null,
            productIdVar: 0,
            brands: [],
            categories: [],
            subcategories: [],
            pageOfItems: [],
            ascDesFlag: false
         }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.reloadProductList = this.reloadProductList.bind(this);
        this.onChangePage = this.onChangePage.bind(this);   
        this.sortBy = this.sortBy.bind(this);    
    }

    componentDidMount() {
        this.reloadProductList();
    }

    async reloadProductList() {
        await ApiProductService.fetchProducts()
            .then((res) => {
                this.setState({ products: res.data, isloading: false });
            });
        
        await ApiBrandService.fetchBrands()
            .then((res) => {
                this.setState({ brands: res.data, isloading: false });
            });

        await ApiCategoryService.fetchCategories()
            .then((res) => {
                this.setState({ categories: res.data, isloading: false });
            });
        
        await ApiSubCategoryService.fetchSubCategories()
            .then((res) => {
                this.setState({ subcategories: res.data, isloading: false });
            });
    }   

    async deleteProduct(productId) {        
        let r = window.confirm("Do you want to delete this item");
        if (r === true) {
            ApiProductService.deleteProduct(productId)
            .then(res => {
                this.setState({message : 'Product deleted successfully.'});
                this.reloadProductList();
            });
        }
    }

    async editProduct(productId) {
        window.localStorage.setItem("productId", productId);
        this.props.history.push('/edit-product');
    }

    async addProduct() {
        window.localStorage.removeItem("productId");
        this.props.history.push('/add-product');
    }

    onChangePage(pageOfItems) {   
        this.setState({ pageOfItems: pageOfItems });
    }
     
    sortBy(key) {
        let adFlag = false;
        if (this.state.ascDesFlag === true) {
            adFlag = false;
        } else if (this.state.ascDesFlag === false) {
            adFlag = true;
        }      
        let sortArray = SortUtitlityService.sortBy(this.state.pageOfItems, key, adFlag);
        
        this.setState({ascDesFlag : adFlag});
        this.setState({ pageOfItems : SortUtitlityService.sortBy(this.state.pageOfItems, key, this.state.ascDesFlag)});       
    }

    render() { 
        const { currentSort } = this.state;
        return ( 
            <GridWrapper>                  
                
                <p align="center"><h3>Product Information</h3></p>
                <p>
                    <Button variant="contained" size="sm" color="primary" onClick={() => this.addProduct()}>
                        Add Product
                    </Button>
                </p>                
                
                <Table striped bordered hover size="sm" style={{width:"100%"}}>
                   <thead>
                       <tr>
                            <th style={{textAlign:"left"}} >   
                               Product <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('productName')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"left"}}>Brand</th>
                            <th style={{textAlign:"left"}}>Category</th>
                            <th style={{textAlign:"left"}}>Sub Category</th>
                            <th style={{textAlign:"center"}}>
                                Model <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('modleYear')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"right"}}>
                                Price <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('listPrice')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"center"}}>Active</th>
                            <th style={{textAlign:"center"}}>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                        {
                            this.state.pageOfItems.map(
                                product =>
                                <tr key={product.productId}>
                                    <td>{product.productName}</td>                            
                                    <td>
                                        <select value={product.brandId} disabled={true} class="btn-sm">
                                            {this.state.brands.map((brand) => <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <select value={product.categoryId} disabled={true} class="btn-sm">
                                            {this.state.categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <select value={product.subCategoryId} disabled={true} class="btn-sm">
                                            {this.state.subcategories.map((subcategory) => <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>{subcategory.subCategoryName}</option>)}
                                        </select>
                                    </td>                                    
                                    <td style={{textAlign:"center"}}>{product.modleYear}</td>
                                    <td style={{textAlign:"right"}}>{product.listPrice}</td>
                                    <td style={{textAlign:"center"}}><input type="checkbox" checked={product.active} disabled={true}/></td>
                                    <td style={{textAlign:"center",width:"150px"}}>
                                        <td><Button variant="success"  style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.deleteProduct(product.productId)}> Delete</Button></td>
                                        <td><Button variant="success"  style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.editProduct(product.productId)}> Edit</Button></td>
                                    </td>                                   
                                </tr>
                            )
                        }
                   </tbody>
                </Table>
                <div style={{float: 'right'}}>
                    <Pagination items={this.state.products} onChangePage={this.onChangePage}/>
                </div>

            </GridWrapper>
         );
    }
}
 
export default ListProductComponent;