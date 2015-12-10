/* global require */
const request = require('superagent')

export const SET_QUERY_SERVICE = 'SET_QUERY_SERVICE'
export function setQueryService(service) {
  return {
    type: SET_QUERY_SERVICE,
    service: service
  }
}

export const SET_QUERY_METHOD = 'SET_QUERY_METHOD'
export function setQueryMethod(method) {
  return {
    type: SET_QUERY_METHOD,
    method: method
  }
}

export const SET_QUERY_BODY = 'SET_QUERY_BODY'
export function setQueryBody(body) {
  return {
    type: SET_QUERY_BODY,
    body: body
  }
}

export const REQUEST_REGISTRY = 'REQUEST_REGISTRY'
export function requestRegistry() {
  return {
    type: REQUEST_REGISTRY
  }
}

export const RECEIVE_REGISTRY = 'RECEIVE_REGISTRY'
export function receiveRegistry(registry) {
  return {
    type: RECEIVE_REGISTRY,
    registry: registry
  }
}

export const REQUEST_QUERY = 'REQUEST_QUERY'
export function requestQuery() {
  return {
    type: REQUEST_QUERY
  }
}

export const RECEIVE_QUERY = 'RECEIVE_QUERY'
export function receiveQuery(response) {
  return {
    type: RECEIVE_QUERY,
    response: response
  }
}

export function fetchRegistry() {
  return function (dispatch) {
    dispatch(requestRegistry)

    request.get(`//${window.location.hostname}:8082/registry`)
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        let services = new Map()
        response.body.services.forEach((service) => {
          services.set(service.Name, null)
        })

        dispatch(receiveRegistry(services))
      })
  }
}

export function fetchQueryResponse(service, method, requestData) {
  return function(dispatch) {
    dispatch(requestQuery)

    request.post('//localhost:8081/rpc')
      .type('form')
      .send({ service: service })
      .send({ method: method })
      .send({ request: requestData })
      .end((error, response) => {
        dispatch(receiveQuery(JSON.parse(response.text)))
      })
  }
}
