import { REQUEST_REGISTRY, RECEIVE_REGISTRY } from '../actions'
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'

/*  State map:
 *
 *  {
 *    router: {},
 *    registry: {
 *      services: [],
 *      isFetching: false
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

const rootReducer = combineReducers({
  registry: registryReducer,
  router: routerStateReducer
})

export default rootReducer
