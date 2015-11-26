/* global require */
const request = require('superagent')

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

    request.get('//localhost:8080/dashboard/registry/all')
      .end((error, response) => {
        let services = new Map()
        response.body.forEach((service) => {
          let versions = new Map()
          service.forEach((serviceVersion) => {
            versions.set(serviceVersion.Version || 'unknown', serviceVersion)
          })
          services.set(service[0].Name, versions)
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
      .send({ requestData: requestData })
      .end((error, response) => {
        dispatch(receiveQuery(response))
      })
  }
}
