import React from 'react'
import Nodes from './nodes'
import Endpoints from './endpoints'

export default React.createClass({
  displayName: 'Service',

  render: function() {
    return <div>
      <Nodes name={this.props.name} nodes={this.props.service.Nodes} />
      <Endpoints endpoints={this.props.service.Endpoints} />
    </div>
  }
})
