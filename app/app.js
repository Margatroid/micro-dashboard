import React from 'react'
import ReactDOM from 'react-dom'
import { IndexRoute, Route } from 'react-router'
import Layout from './layout'
import Explorer from './containers/explorer'
import Query from './components/query'
import Service from './components/service'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from './reducers'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ReduxRouter, reduxReactRouter } from 'redux-router'
import { createHistory } from 'history'

const loggerMiddleware = createLogger()

const store = compose(
                applyMiddleware(thunkMiddleware, loggerMiddleware),
                reduxReactRouter({ createHistory })
              )(createStore)(rootReducer)

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
InjectTapEventPlugin()

ReactDOM.render(
  <div>
    <Provider store={store}>
      <ReduxRouter>
        <Route path='/' component={Layout}>
          <IndexRoute component={Explorer} />

          <Route path='explorer' component={Explorer} >
            <Route path=':name' component={Service} />
          </Route>

          <Route path='query' component={Query} />
        </Route>
      </ReduxRouter>
    </Provider>
  </div>,
  document.getElementById('app-container')
)

