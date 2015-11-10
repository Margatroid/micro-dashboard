import React from 'react'
import { connect } from 'react-redux'
import { requestRegistry } from '../actions'

const ServicesList = React.createClass({
  displayName: 'ServicesList',

  render: function() {
    const { dispatch, registry } = this.props

    return <div>
      List of services
      <span onClick={() => dispatch(requestRegistry())}>
        Dispatch
      </span>

      {registry.serviceNames}
    </div>
  }
})

function select(state) {
  return state
}
export default connect(select)(ServicesList)
