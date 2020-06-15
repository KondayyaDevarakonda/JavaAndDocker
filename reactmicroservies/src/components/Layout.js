import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavigationBar } from './NavigationBar';
import Sidebar from './SideBar';



export class Layout extends Component {

  render() {
    return (
        <div>
            <NavigationBar />

            <Sidebar />
            </div>
    );
  }
}
