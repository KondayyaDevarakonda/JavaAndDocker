import React from 'react';
import PropTypes from 'prop-types';
//import { Button } from 'reactstrap';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {}, selectedPage: 0 };
    }

    componentWillMount() {
        // set page if items array isn't empty
        var editDeleteFlag = this.getStateEidtDelete();
        console.log(parseInt(Object.values(editDeleteFlag)) === 0);
        if (this.props.items && this.props.items.length && (parseInt(Object.values(editDeleteFlag)) === 0)) {
            this.setPage(this.props.initialPage);
        } 

        if (this.props.items && this.props.items.length && (parseInt(Object.values(editDeleteFlag)) === 1)) {
          console.log("inside true condition");
          this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        var editDeleteFlag = this.getStateEidtDelete();
        console.log(parseInt(Object.values(editDeleteFlag)) === 0);
        if (this.props.items !== prevProps.items && (parseInt(Object.values(editDeleteFlag)) === 0)) {
            this.setPage(this.props.initialPage);
        } 

        if (this.props.items !== prevProps.items && (parseInt(Object.values(editDeleteFlag)) === 1)) {
          console.log("inside true condition");
          this.setPage(this.props.initialPage);
        }

    }

    setPage(page) {
        var { items, pageSize } = this.props;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    setSelectedPage( currentPage ) {
        localStorage.setItem( 'SelectedPage', currentPage );
        this.setState( { selectedPage: currentPage } );
    }

    getSelectedPage() {
        var selectedPage = localStorage.getItem( 'SelectedPage' ) || 1;
    
        return {
          selectedPage: selectedPage
        };
    }

    getStateEidtDelete() {
      var stateEidtDelete = localStorage.getItem( 'StateEidtDelete' ) || 0;
  
      return {
        stateEidtDelete: stateEidtDelete
      };
    }

    setStateEidtDelete(value) {
      localStorage.setItem( 'StateEidtDelete', value );
      this.setState( { stateEidtDelete: value } );
    }

    getPager(totalItems, currentPage, pageSize) {

        var stateEidtDelete = this.getStateEidtDelete();
        console.log(parseInt(Object.values(stateEidtDelete)) === 0);

        console.log(this.setStateEidtDelete)
        if (parseInt(Object.values(stateEidtDelete)) === 1) {
          var selectedPage = parseInt(Object.values(this.getSelectedPage()));
          currentPage = selectedPage;
        }        

        this.setSelectedPage( currentPage );
        this.setStateEidtDelete(0);
        
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div>
              <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                  <Button size="sm" onClick={() => this.setPage(1)} disabled={pager.currentPage === 1}>First</Button>
                  <Button size="sm" onClick={() => this.setPage(pager.currentPage - 1)} disabled={pager.currentPage === 1}>Prev.</Button>
                  {pager.pages.map((page, index) =>
                    <Button key={index} size="sm" onClick={() => this.setPage(page)}>{page}</Button> 
                  )}
                  <Button size="sm" onClick={() => this.setPage(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages}>Next</Button>
                  <Button size="sm" onClick={() => this.setPage(pager.totalPages)} disabled={pager.currentPage === pager.totalPages}>Last</Button>
                </ButtonGroup>
               
              </ButtonToolbar>               
            </div>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;