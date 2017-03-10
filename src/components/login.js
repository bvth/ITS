import React from 'react'
import {logIn} from '../action'
import md5 from 'MD5'
import {Button} from 'react-bootstrap'

require('./style/login.less')

export default class LogIn extends React.Component{
    constructor(){
        super();
        this.Login = this.handleLogin.bind(this);
    }
    handleLogin(event){
        event.preventDefault();
        var self=this;
        var details = {
            'username': self.refs.username.value,
            'password': md5(self.refs.password.value)
        }
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        // console.log(formBody);
        //=========fetch========//
        fetch('/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache'
            },
            body: formBody
        }).then(function(response) {
            return response.json()
        }).then(function(body) {
            console.log(body);
            logIn(self.refs.username.value,body.Users[0].level);
        })

    }
    render(){
        return(
            <div className="intro">
            <h1>Inventory Tracking System</h1>
            <form className="login" onSubmit={this.Login}>
                <input className="login_username" placeholder="username" ref="username" type="text" required/><br/>
                <input className="login_password" placeholder="password" ref="password" type="password" require/><br/>
                <Button bsStyle="primary" bsSize="sm" type="submit">Log in</Button>
                <div className="login_warning" id="warning"></div>
            </form>
            </div>
        )
    }
}
