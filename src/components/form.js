import React from 'react'

export default class Form extends React.Component{
    constructor(){
        super();
        this.Submit = this.handleSubmit.bind(this);
    }
    //send data to database
    handleSubmit(event){
        event.preventDefault();
        var self = this;
        var details = {
            'username': self.refs.username.value,
            'password': self.refs.password.value,
            'name': self.refs.name.value,
            'level': self.refs.level.value,
            'dep': self.refs.dep.value
        }
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
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
                <h1>Register user form</h1>
                <form id="form" onSubmit={this.Submit}>
                    <input type="text" placeholder='username' ref="username" required/><br/>
                    <input type="password" placeholder='password' ref="password" required/><br/>
                    <input type="text" placeholder="name" ref="name" required/><br/>
                    <input type="text" placeholder="level" ref="level" required/><br/>
                    <input type="text" placeholder="department" ref="dep" required/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
