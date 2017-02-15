import React from 'react'

export default class Result extends React.Component{
    render(){
        return(
            <div className="result">
                <h1>Result</h1>
                <div className="result_show">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
