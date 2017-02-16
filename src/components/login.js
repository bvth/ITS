import React from 'react'

export default class Login extends React.Component{
    constructor(){
        super();
        this.Login = this.handleLogin.bind(this);
    }
    handleLogin(event){
        event.preventDefault();
        var self=this;
        var details = {
            'username': self.refs.username.value,
            'password': self.refs.password.value
        }
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
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
        });
    }
    render(){
        return(
            <form onSubmit={this.Login}>
                <input placeholder="username" ref="username" type="text" />
                <input placeholder="password" ref="password" type="password"/>
                <button type="submit">Log in</button>
            </form>
        )
    }
}
