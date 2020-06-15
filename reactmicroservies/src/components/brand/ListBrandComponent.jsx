import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'reactstrap';
import ApiBrandService from "../../services/ApiBrandService";
import Pagination from '../Pagination';
import SortUtitlityService from '../../utility/SortUtitlityService';
import UpArrow from '../../icons/UpArrow.png';
import DownArrow from '../../icons/DownArrow.png';

const GridWrapper = styled.div` 
  margin-top: 1em;
  margin-left: 12em;
  margin-right: 6em;
`;

class ListBrandComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            brands: [],
            message: null,
            brandIdVar: 0,
            pageOfItems: []
         }
        this.deleteBrand = this.deleteBrand.bind(this);
        this.editBrand = this.editBrand.bind(this);
        this.addBrand = this.addBrand.bind(this);
        this.reloadBrandList = this.reloadBrandList.bind(this);        
        this.onChangePage = this.onChangePage.bind(this);   
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        this.reloadBrandList();
    }

    async reloadBrandList() {
        ApiBrandService.fetchBrands()
            .then((res) => {
                this.setState({ brands: res.data, isloading: false });
            });
    }   

    async deleteBrand(brandId) {        
        let r = window.confirm("Do you want to delete this item");
        if (r === true) {
            ApiBrandService.deleteBrand(brandId)
            .then(res => {
                this.setState({message : 'Brand deleted successfully.'});
                this.reloadBrandList();
            });
        }
    }

    async editBrand(brandId) {
        window.localStorage.setItem("brandId", brandId);
        this.props.history.push('/edit-brand');
    }

    async addBrand() {
        window.localStorage.removeItem("brandId");
        this.props.history.push('/add-brand');
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
        let upArrow = "&#x25B2;";
        let downArrow = "abcd" ;
        return ( 
            <GridWrapper>
                <p align="center"><h3>Brand Information</h3></p>
                <p>
                    <Button variant="contained" size="sm" color="primary" onClick={() => this.addBrand()}>
                        Add Brand
                    </Button>
                </p>                
                
                <Table striped bordered hover size="sm" style={{width:"100%"}}>
                   <thead>
                       <tr>
                            <th style={{textAlign:"left"}}>
                                Brand Name <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('brandName')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"center"}}>Active Flag</th> 
                            <th style={{textAlign:"center"}}>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                        {
                            this.state.pageOfItems.map(
                                brand =>
                                <tr key={brand.brandId}>
                                    <td>{brand.brandName}</td>
                                    <td style={{textAlign:"center"}}><input type="checkbox" checked={brand.active} disabled={true}/></td>
                                    <td style={{textAlign:"center",width:"150px"}}>
                                        <td><Button variant="success" style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.deleteBrand(brand.brandId)}> Delete</Button></td>
                                        <td><Button variant="success" style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.editBrand(brand.brandId)} > Edit</Button></td>
                                    </td>                                   
                                </tr>
                            )
                        }
                   </tbody>
                </Table>
                <div style={{float: 'right'}}>
                    <Pagination items={this.state.brands} onChangePage={this.onChangePage}/>
                </div>
            </GridWrapper>
         );
    }
}
 
export default ListBrandComponent;