import { REQUEST_REGISTRY } from '../actions'
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'

function RegistryReducer(state = {serviceNames: []}, action) {
  switch (action.type) {
    case REQUEST_REGISTRY:
      return Object.assign({}, state, {
        serviceNames: ['LOLTEST']
      })
    default:
      return state
  }
}

const allReducers = combineReducers({
  registry: RegistryReducer,
  router: routerStateReducer
})

export default allReducers
