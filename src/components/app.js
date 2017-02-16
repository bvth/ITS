import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'


import Main from './main'
import Login from './login'
import Home from './home'

import Form from './form'
import Result from './result'
import Test from './test'

let loggedIn = true;
let lvl = 2;
function checkAuth(nextState, replace){
    if(loggedIn != true){
        alert("Log in first!")
        replace({
            pathname: ''
        })
    }
}
function checkLevel(nextState,replace){
    if(loggedIn != true){
        alert("Log in first!")
        replace({
            pathname: ''
        })
    }
    else if(lvl <=3){
        alert("you are not authorized");
        replace({
            pathname:'home'
        })
    }
}

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route component={Main}>
            <Route path="home" component={Home} onEnter={checkAuth}/>
            <Route path="test" >
                <Route component={Result} >
                    <IndexRoute component={Test} onEnter={checkAuth}/>
                </Route>
            </Route>

            <Route path="form" >
                <Route component={Result}>
                    <IndexRoute component={Form} onEnter={checkLevel}/>
                </Route>
            </Route>
        </Route>
    </Router>
);
