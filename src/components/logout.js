import React from 'react'
import logOut from '../action'
import {Button} from 'react-bootstrap'

export default class LogOut extends React.Component{
    constructor(props){
        super();
        this.Click = this.handleLogOut.bind(this);
    }
    handleLogOut(){
        logOut();
    }
    render(){
        return(
            <Button bsStyle="primary" bsSize="sm" onClick={this.Click}>Log out</Button>
        )
    }
}
