import React from 'react'
import ReactDOM from 'react-dom'
import { IndexRoute, Router, Route } from 'react-router'
import Layout from './layout'
import Explorer from './components/explorer'
import Query from './components/query'
import InjectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
InjectTapEventPlugin()

ReactDOM.render(
  <Router>
    <Route path='/' component={Layout}>
      <IndexRoute component={Explorer} />
      <Route path='explorer' component={Explorer} />
      <Route path='query' component={Query} />
    </Route>
  </Router>,
  document.getElementById('app-container')
)

