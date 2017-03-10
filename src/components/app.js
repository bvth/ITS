import React from 'react'
import {Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router'
import {Grid} from 'react-bootstrap'

import Main from './main'
import LogIn from './login'
import LogOut from './logout'
import Home from './home'

import Form from './form'
import Result from './result'
import Inventory from './inventory'

import loggedIn from '../action'
require('./style/default.less');

let lvl = 6;
function checkAuth(nextState, replace){
    if(localStorage.In!='true'){
        alert('Please log in first')
        replace({
            pathname: ''
        })
    }
}
function checkLevel(nextState,replace){
    // if(In!= true){
    //     alert(loggedIn)
    //     replace({
    //         pathname: ''
    //     })
    // }
    if(localStorage.lvl <=3){
        alert("you are not authorized");
        replace({
            pathname:'home'
        })
    }
}

export default (
    <Grid>
    <Router history={browserHistory}>
        <Route path="/" component={LogIn} />
        <Route component={Main} onEnter={checkAuth}>
            <Route path="home" component={Home}/>
            <Route path="inventory" >
                <Route component={Result} >
                    <IndexRoute component={Inventory}/>
                </Route>
            </Route>

            <Route path="form" >
                <Route component={Result}>
                    <IndexRoute component={Form} onEnter={checkLevel}/>
                </Route>
            </Route>
            <Route path="logout" component={LogOut}/>
        </Route>
    </Router>
    </Grid>
);
