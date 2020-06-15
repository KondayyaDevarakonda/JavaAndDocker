import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'reactstrap';
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

class ListCategoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            categories: [],
            message: null,
            categoryIdVar: 0,
            pageOfItems: []
         }
        this.deleteCategory = this.deleteCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.reloadCategoryList = this.reloadCategoryList.bind(this);        
        this.onChangePage = this.onChangePage.bind(this);   
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        this.reloadCategoryList();
    }

    async reloadCategoryList() {
        ApiCategoryService.fetchCategories()
            .then((res) => {
                this.setState({ categories: res.data, isloading: false });
            });
    }   

    async deleteCategory(categoryId) {        
        let r = window.confirm("Do you want to delete this item");
        if (r === true) {
            ApiCategoryService.deleteCategory(categoryId)
            .then(res => {
                this.setState({message : 'Category deleted successfully.'});
                this.reloadCategoryList();
            });
        }
    }

    async editCategory(categoryId) {
        window.localStorage.setItem("categoryId", categoryId);
        this.props.history.push('/edit-category');
    }

    async addCategory() {
        window.localStorage.removeItem("categoryId");
        this.props.history.push('/add-category');
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
                <p align="center"><h3>Category Information</h3></p>
                <p>
                    <Button variant="contained" size="sm" color="primary" onClick={() => this.addCategory()}>
                        Add Category
                    </Button>
                </p>                
                
                <Table striped bordered hover size="sm" style={{width:"100%"}}>
                   <thead>
                       <tr>
                            <th style={{textAlign:"left"}}>
                                Category Code <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('categoryCode')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"left"}}>
                                Category Name <Button style={{backgroundColor:"white",width:"22px", height:"20px", fontSize: "5px", padding:"0px 0px", textAlign:"center"}}  onClick={() => this.sortBy('categoryName')}><img style={{height:"20px"}} src={this.state.ascDesFlag ? UpArrow : DownArrow}/></Button>
                            </th>
                            <th style={{textAlign:"center"}}>Active</th>
                            <th style={{textAlign:"center"}}>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                        {
                            this.state.pageOfItems.map(
                                category =>
                                <tr key={category.categoryId}>
                                    <td>{category.categoryCode}</td>
                                    <td>{category.categoryName}</td>
                                    <td style={{textAlign:"center"}}><input type="checkbox" checked={category.active} disabled={true}/></td>
                                    <td style={{textAlign:"center",width:"150px"}}>                                        
                                        <td><Button variant="success" style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.deleteCategory(category.categoryId)}>Delete</Button></td>                                       
                                        <td><Button variant="success" style={{backgroundColor:"green",size:"1px",width:"60px", padding:"0px 1px"}} onClick={() => this.editCategory(category.categoryId)}>Edit</Button></td>                                                                           
                                    </td>                                                                       
                                </tr>
                            )
                        }
                   </tbody>
                </Table>
                <div style={{float: 'right'}}>
                    <Pagination items={this.state.categories} onChangePage={this.onChangePage}/>
                </div>
            </GridWrapper>
         );
    }
}
 
export default ListCategoryComponent;