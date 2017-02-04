import React from 'react'
import _ from 'lodash'
export default class Form extends React.Component{
    constructor(){
        super();
        this.Click = this.handleClick.bind(this);
        this.Submit = this.handleSubmit.bind(this);
    }
    handleClick(event){
        event.preventDefault();
        var self = this;
        fetch('/users',{
            method:'GET',
            headers:{'Content-Type': 'text/plain'}
        }).then(function(response){
            return response.json()
        }).then(function(body){
            _.map(body.Users,(x,i)=>
                document.getElementById('mess').innerHTML = body.Users[i].user_email
                // console.log(body.Users[i].user_email)
            )
        })
    }
    handleSubmit(event){
        event.preventDefault();
        var self = this;
        var details = {
            'username': self.refs.username.value,
            'password': self.refs.password.value,
        }
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody);
        //=========fetch========//
        fetch('/users',{
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
            <div >
                <button onClick={this.Click}>Clickclick</button>
                <span id='mess'></span>
                <form id="form" onSubmit={this.Submit}>
                    <input type="text" placeholder='username' ref="username"/>
                    <input type="password" placeholder='password' ref="password"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
