import { REQUEST_REGISTRY } from '../actions'

const initialState = {
  serviceNames: []
}

export default function MicroDashboardApp(state = initialState, action) {
  switch (action.type) {
    case REQUEST_REGISTRY:
      return Object.assign({}, state, {
        serviceNames: ['LOLTEST']
      })
    default:
      return state
  }
}
