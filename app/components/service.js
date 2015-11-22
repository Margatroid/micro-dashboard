import React from 'react'
import Nodes from './nodes'
import Endpoints from './endpoints'

export default React.createClass({
  displayName: 'Service',

  render: function() {
    if (!this.props.service) {
      return <p>Loading...</p>
    }

    return <div>
      <Nodes name={this.props.name}
        version={this.props.service.Version}
        nodes={this.props.service.Nodes} />

      <Endpoints endpoints={this.props.service.Endpoints} />
    </div>
  }
})
