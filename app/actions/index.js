import fetch from 'isomorphic-fetch'

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

    return fetch('//localhost:8080/dashboard/registry/all')
      .then(response => response.json())
      .then(json => {
        // Restructure the data a little
        let registry = new Map()
        json.forEach((service) => {
          registry.set(service.Name, service)
        })

        dispatch(receiveRegistry(registry))
      })
  }
}

export function fetchQueryResponse(service, method, request) {
  return function(dispatch) {
    dispatch(requestQuery)

    const data = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: service,
        method: method,
        request: request
      })
    }

    return fetch('//localhost:8080/dashboard/registry/rpc', data)
      .then(function(response) {
        console.log('Got RPC response', response)
      })
  }
}
