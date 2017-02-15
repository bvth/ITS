import React from 'react'

export default class Test extends React.Component{
    constructor(){
        super();
        this.Click = this.handleClick.bind(this);
    }
    handleClick(event){
        event.preventDefault();
        var self = this;
        fetch('/show',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'cache-control': 'no-cache'
            },

        }).then(function(response){
            // console.log(response);
            return response.json();
        }).then(function(body){
            // _.map(body.Users,(x,i)=>
                console.log(body);
                // document.getElementById('mess').innerHTML = body.status;
            // )
        })
    }
    render(){
        return(
            <div>
                <button onClick={this.Click}>Clickclick</button>
                <span id='mess'></span>
            </div>
        )
    }
}
