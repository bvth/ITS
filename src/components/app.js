import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'


import Main from './main'
import Home from './home.js'

import Form from './form.js'
import Result from './result.js'
import Test from './test.js'

export default (
    <Router history={browserHistory}>
      <Route component={Main}>
        <Route path="home" component={Home} />

        <Route path="test">
          <Route component={Result}>
            <IndexRoute component={Test} />
          </Route>
        </Route>

        <Route path="form">
          <Route component={Result}>
            <IndexRoute component={Form} />
          </Route>
        </Route>

      </Route>
    </Router>
        );
