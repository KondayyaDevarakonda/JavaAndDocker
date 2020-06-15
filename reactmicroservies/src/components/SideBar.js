import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    width: 160px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    top: 3.4em;      /* Stay at the top */
    background-color: #222; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: [
                {
                  path: '/', /* path is used as id to check which NavItem is active basically */
                  name: 'Home',
                  css: 'fa fa-fw fa-home',
                  key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                  path: '/categories',
                  name: 'Category',
                  css: 'fa fa-fw fa-home',
                  key: 2
                },
                {
                    path: '/subcategories',
                    name: 'Sub Category',
                    css: 'fa fa-fw fa-home',
                    key: 3
                  },
                {
                  path: '/brands',
                  name: 'Brand',
                  css: 'fa fa-fw fa-home',
                  key: 4
                },
                {
                    path: '/products',
                    name: 'Products',
                    css: 'fa fa-fw fa-home',
                    key: 5
                  },
              ]
        }
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { items, activePath } = this.state;
        return(
            <StyledSideNav>
                {
                    items.map((item) => {
                        return (
                            <NavItem 
                                path={item.path}
                                name={item.name}
                                css={item.css}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath}
                                key={item.key}
                            />
                        );
                    })
                }
            </StyledSideNav>
        );
    }
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 30px;
    width: 160px; /* width must be same size as NavBar to center */
    text-align: Left; /* Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    padding-left: 10px;
    a {
        font-size: 1em;
        color: ${(props) => props.active ? "white" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }  
    }
`;

class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return(
            <StyledNavItem active={active}>
                <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
                    <div>{this.props.name}</div>
                </Link>
            </StyledNavItem>
        );
    }
}

// const NavIcon = styled.div`
// `;

export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav></RouterSideNav>
        );
    }
}




// import React, { Component } from 'react';
// import { Link, BrowserRouter as Router } from 'react-router-dom';
// import { Nav, Navbar, NavItem } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import './NavBar.css';

// export class SideMenu extends Component {
//   displayName = SideMenu.name

//   render() {
//     return (
//         <div>
//             <Navbar inverse fixedTop fluid collapseOnSelect>           
//                 <Nav defaultActiveKey="/" className="flex-column">
//                     <Nav.Link href="/">Home</Nav.Link>
//                     <Nav.Link href="/categories">Category</Nav.Link>
//                     <Nav.Link href="/brands">Brand</Nav.Link>
//                 </Nav>
//             </Navbar>
//         </div>
//     );
//   }
// }
