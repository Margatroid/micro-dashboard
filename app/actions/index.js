/* global require */
const request = require('superagent')

const apiPath = '//178.62.6.159:8082'
const registryPath = `${apiPath}/registry`
const rpcPath = `${apiPath}/rpc`

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

export const REQUEST_SERVICE = 'REQUEST_SERVICE'
export function requestService() {
  return {
    type: REQUEST_SERVICE
  }
}

export const RECEIVE_SERVICE = 'RECEIVE_SERVICE'
export function receiveService(service, versions) {
  return {
    type: RECEIVE_SERVICE,
    service: service,
    versions: versions
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

    request.get(registryPath)
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

export function fetchService(service) {
  return function (dispatch) {
    dispatch(requestService)

    request.get(registryPath)
      .query({ service: service })
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        let versions = new Map()

        response.body.services.forEach((service) => {
          versions.set(service.Version, service)
        })

        dispatch(receiveService(service, versions))
      })
  }
}


export function fetchQueryResponse(service, method, requestData) {
  return function(dispatch) {
    dispatch(requestQuery)

    request.post(rpcPath)
      .type('form')
      .send({ service: service })
      .send({ method: method })
      .send({ request: requestData })
      .end((error, response) => {
        dispatch(receiveQuery(JSON.parse(response.text)))
      })
  }
}
