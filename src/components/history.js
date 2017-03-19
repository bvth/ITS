import React from "react"
import {Button} from "react-bootstrap"
import {browserHistory} from 'react-router'

var content=[];
export default class History extends React.Component{
    constructor(props){
        super(props);
        this.Submit = this.handleSubmit.bind(this);
    }
    //send request
    handleSubmit(event){
        event.preventDefault();
        var formBody;
        var encodedKey = encodeURIComponent('title');
        var encodedValue = encodeURIComponent(this.refs.title.value);
        formBody=encodedKey + "=" + encodedValue;
        fetch('/history',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache'
            },
            body: formBody
        }).then(function(response) {
            return response.json()
        }).then(function(body,replace) {
            console.log(body);
            content=body;
            browserHistory.replace("/history")
        });
    }
    table(){
            return(
                <table>
                    <thead>
                        <tr>
                            <td>Transport ID</td>
                            <td>Product</td>
                            <td>Check in</td>
                            <td>Signature</td>
                            <td>Check out</td>
                            <td>Signature</td>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(content,(x,i)=>
                            [
                                <tr key={i}>
                                    <td>{content[i].trans_id}</td>
                                    <td>{this.refs.title.value}</td>
                                    <td>{content[i].in_date}</td>
                                    <td>{content[i].signature_in}</td>
                                    <td>{content[i].out_date}</td>
                                    <td>{content[i].signature_out}</td>
                                </tr>
                            ]
                        )}
                    </tbody>
                </table>
            )

    }
    render(){
        return(
            <div className="history_container">
                <h1>Transport history</h1>
                <form className="history_form" onSubmit={this.Submit}>
                    <input type="text" placeholder="name of product" ref="title" required/>
                    <Button bsStyle="primary" type="submit" bsSize="sm">Choose</Button>
                </form>
                {this.table()}
            </div>
        )
    }
}
