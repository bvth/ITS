import React from 'react'
import {Link} from 'react-router-dom'
import {Nav, NavItem,Button} from 'react-bootstrap'
import { browserHistory } from 'react-router'
import logOut from '../action'

require('./style/main.less');

export default class Main extends React.Component{
    logOut(){
        browserHistory.replace('/');
        localStorage.removeItem('lvl');
        localStorage.removeItem('In');
    }
    render(){
        return(
            <div className="list">
                <Nav bsStyle="tabs">
                    <NavItem eventKey="1" href="/home">Home</NavItem>
                    <NavItem eventKey="2" href="/inventory">Inventory</NavItem>
                    <NavItem eventKey="3" href="/history">History</NavItem>
                    <NavItem eventKey="3" href="/form">User form</NavItem>
                </Nav>
                <Button bsStyle="primary" bsSize="sm" onClick={this.logOut}>Log out</Button>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
