import React from 'react'
import _ from 'lodash'
import {browserHistory} from 'react-router'
import {Button} from 'react-bootstrap'

let content;
let compa;
let col;
export default class Inventory extends React.Component{
    constructor(){
        super();
        this.Click = this.handleClick.bind(this);
        this.Submit = this.handleSubmit.bind(this);
        this.state={
            content:[]
        }
    }
    handleClick(event){
        event.preventDefault();
        fetch('/inventory',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'cache-control': 'no-cache'
            },
        }).then(function(res){
            // console.log(response);
            return res.json();
        }).then(function(body,replace){
            // _.map(body.Users,(x,i)=>
                content = body.Inventory;
                browserHistory.replace("/inventory")
            // )
        })
    }
    handleSubmit(event){
        event.preventDefault();
        // let response = this.state.content.slice();
        var data={
            'col': col,
            'compare' : compa,
            'value': this.refs.value.value
        }
        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/search',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache'
            },
            body: formBody
        }).then(function(res){
            return res.json()
        }).then(function(body){
            content = body.Inventory;
            browserHistory.replace("/inventory")
        })
    }
    handleChange(event){
        let val = event.target.value;
        col=val;
    }
    handleChangeCompare(event){
        let val = event.target.value;
        compa = val;
    }
    table(){
        return(
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Unit price</td>
                        <td>Signature</td>
                        <td>Level</td>
                    </tr>
                </thead>
                <tbody>
                {_.map(content,(x,i)=>
                    [
                        <tr key={i}>
                            <td>{content[i].title}</td>
                            <td>{content[i].amount}</td>
                            <td>{content[i].unit_price}</td>
                            <td>{content[i].signature}</td>
                            <td>{content[i].level}</td>
                        </tr>
                    ]
                )}
                </tbody>
            </table>
        )
    }
    render(){
        return(
            <div>
                <form id="inventory" className="inventory" onSubmit={this.Submit}>
                    <select id="inventory_select" className="inventory_select" onChange={this.handleChange.bind(this)}>
                        <option defaultValue> -- select an option -- </option>
                        <option value='title'>Name</option>
                        <option value='amount'>Amount</option>
                        <option value='unit_price'>Unit price</option>
                        <option value='level'>Level</option>
                    </select>
                    <select id="inventory_compare" className="inventory_select" onChange={this.handleChangeCompare.bind(this)}>
                        <option defaultValue> -- select an option -- </option>
                        <option value='less'>less than</option>
                        <option value='equals'>equals</option>
                        <option value='more'>more than</option>
                    </select>                    
                    <input type="text" ref="value"/>
                    <Button bsStyle="primary" bsSize="sm" type="submit">Submit</Button>
                </form>
                <button onClick={this.Click}>Show database</button>
                {this.table()}
            </div>
        )
    }
}
