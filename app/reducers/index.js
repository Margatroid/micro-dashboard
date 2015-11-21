import { REQUEST_REGISTRY, RECEIVE_REGISTRY, REQUEST_QUERY, RECEIVE_QUERY } from '../actions'
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'

/*  State map:
 *
 *  {
 *    router: {},
 *    registry: {
 *      services: [],
 *      isFetching: false
 *    },
 *    query: {
 *      isFetching: false,
 *      response: {},
 *    }
 *  }
 */

function registryReducer(state = {
  services: new Map(),
  isFetching: false
}, action) {

  switch (action.type) {
    case REQUEST_REGISTRY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_REGISTRY:
      return Object.assign({}, state, {
        isFetching: false,
        services: action.registry
      })
    default:
      return state
  }
}

function queryReducer(state = {
  service: '',
  method: '',
  request: {},
  result: {}
}, action) {

  switch (action.type) {
    case REQUEST_QUERY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_QUERY:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  registry: registryReducer,
  router: routerStateReducer,
  query: queryReducer
})

export default rootReducer
