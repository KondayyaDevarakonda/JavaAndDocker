import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'reactstrap';
import ApiSubCategoryService from "../../services/ApiSubCategoryService";
import ApiCategoryService from "../../services/ApiCategoryService";
import Pagination from '../Pagination';
import SortUtitlityService from '../../utility/SortUtitlityService';
import UpArrow from '../../icons/UpArrow.png';
import DownArrow from '../../icons/DownArrow.png';

const GridWrapper = styled.div` 
  margin-top: 1em;
  margin-left: 12em;
  margin-right: 6em;
`;

class ListSubCategoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            subcategories: [],
            message: null,
            subCategoryIdVar: 0,
            categories: [],
            pageOfItems: []
         }
        this.deleteSubCategory = this.deleteSubCategory.bind(this);
        this.editSubCategory = this.editSubCategory.bind(this);
        this.addSubCategory = this.addSubCategory.bind(this);
        this.reloadSubCategoryList = this.reloadSubCategoryList.bind(this);
        this.onChangePage = this.onChangePage.bind(this);   
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        this.reloadSubCategoryList();
    }

    async reloadSubCategoryList() {
        ApiSubCategoryService.fetchSubCategories()
            .then((res) => {
                this.setState({ subcategories: res.data, isloading: false });
            });

        ApiCategoryService.fetchCategories()
            .then((res) => {
                this.setState({ categories: res.data, isloading: false });
            });
    }   

    async deleteSubCategory(subCategoryId) {        
        let r = window.confirm("Do you want to delete this item");
        if (r === true) {
            ApiSubCategoryService.deleteSubCategory(subCategoryId)
            .then(res => {
                this.setState({message : 'Sub Category deleted successfully.'});
                this.reloadSubCategoryList();
            });
        }
    }

    async editSubCategory(subCategoryId) {
        window.localStorage.setItem("subCategoryId", subCategoryId);
        this.props.history.push('/edit-subcategory');
    }

    async addSubCategory() {
        window.localStorage.removeItem("subCategoryId");
        this.props.history.push('/add-subcategory');
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
                <p align="center"><h3>Sub Category Information</h3></p>
                <p>
                    <Button variant="contained" size="sm" color="primary" onClick={() => this.addSubCategory()}>
                        Add Sub Category
                    </Button>
                </p>                
                
                <Table striped bordered hover size="sm"  style={{width:"100%"}}>
                   <thead>
                       <tr>
                            <th style={{textAlign:"left"}}>
                                Code <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('subCategoryCode')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"left"}}>
                                Sub Category Name <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('subCategoryName')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"center"}}>Category</th>
                            <th style={{textAlign:"center"}}>Active</th>
                            <th style={{textAlign:"center"}}>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                        {
                            this.state.pageOfItems.map(
                                subcategory =>
                                <tr key={subcategory.subCategoryId}>
                                    <td>{subcategory.subCategoryCode}</td>
                                    <td>{subcategory.subCategoryName}</td>
                                    <td>
                                        <select value={subcategory.categoryId} disabled={true} className="btn-sm">
                                            {this.state.categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)}
                                        </select>
                                    </td>
                                    <td style={{textAlign:"center"}}><input type="checkbox" checked={subcategory.isActive} disabled={true}/></td>
                                    <td style={{textAlign:"center",width:"150px"}}> 
                                        <td><Button variant="success" style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.deleteSubCategory(subcategory.subCategoryId)}>Delete</Button></td>                                       
                                        <td><Button variant="success" style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.editSubCategory(subcategory.subCategoryId)}>Edit</Button></td> 
                                    </td>
                                </tr>
                            )
                        }
                   </tbody>
                </Table>
                <div style={{float: 'right'}}>
                    <Pagination items={this.state.subcategories} onChangePage={this.onChangePage}/>
                </div>

            </GridWrapper>
         );
    }
}
 
export default ListSubCategoryComponent;