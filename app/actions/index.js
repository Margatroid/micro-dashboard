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

export function fetchRegistry() {
  return function (dispatch) {
    dispatch(requestRegistry)

    return fetch('//localhost:8080/dashboard/registry/all')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveRegistry(json))
      )
  }
}
