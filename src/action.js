import md5 from 'MD5'
import {checkAuth} from './components/app'
import { browserHistory } from 'react-router'

export function logIn(username, level,replace){
    localStorage.setItem("lvl",level);
    localStorage.setItem("In", 'true');
    browserHistory.replace('/home')
}

export function checkLoggedIn(){
    return loggedIn;
}
