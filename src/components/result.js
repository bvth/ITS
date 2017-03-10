import React from 'react'

export default class Result extends React.Component{
    render(){
        return(
            <div className="result">
                <div className="result_show">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
