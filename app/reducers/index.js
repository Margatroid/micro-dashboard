import {
  REQUEST_REGISTRY,
  RECEIVE_REGISTRY,
  REQUEST_QUERY,
  RECEIVE_QUERY,
  SET_QUERY_SERVICE,
  SET_QUERY_METHOD,
  SET_QUERY_BODY
} from '../actions'
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import { getRequestBody } from './helpers'

function appReducer(state = {
  registry: new Map(),
  isFetchingRegistry: false,
  isFetchingQuery: false,
  queryResponse: {},
  queryService: '',
  queryMethod: '',
  queryBody: ''
}, action) {

  switch (action.type) {
    case REQUEST_REGISTRY:
      return Object.assign({}, state, {
        isFetchingRegistry: true
      })
    case RECEIVE_REGISTRY:
      return Object.assign({}, state, {
        isFetchingRegistry: false,
        registry: action.registry
      })
    case SET_QUERY_SERVICE:
      // Find the first endpoint this service's first version provides.
      const service = state.registry.get(action.service).values().next().value

      let endpoint = ''
      if (service.Endpoints) endpoint = service.Endpoints[0].Name

      return Object.assign({}, state, {
        queryService: action.service,
        queryMethod: endpoint,
        queryBody: getRequestBody(service, endpoint)
      })
    case SET_QUERY_METHOD:
      return Object.assign({}, state, {
        queryMethod: action.method,
        queryBody: getRequestBody(
          state.registry.get(state.queryService).values().next().value,
          action.method
        )
      })
    case SET_QUERY_BODY:
      return Object.assign({}, state, {
        queryBody: action.body
      })
    case REQUEST_QUERY:
      return Object.assign({}, state, {
        isFetchingQuery: true
      })
    case RECEIVE_QUERY:
      return Object.assign({}, state, {
        isFetchingQuery: false,
        queryResponse: action.response
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  router: routerStateReducer
})

export default rootReducer
