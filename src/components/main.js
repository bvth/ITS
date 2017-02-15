import React from 'react'
import {Link} from 'react-router-dom'
export default class Main extends React.Component{
    render(){
        return(
            <div className="list">
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/test">Test</Link></li>
                    <li><Link to="/form">Form</Link></li>
                </ul>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
