import React from 'react'
import Nodes from './nodes'
import Endpoints from './endpoints'

export default React.createClass({
  displayName: 'Service',

  propTypes: {
    service: React.PropTypes.object
  },

  render: function() {
    if (!this.props.service) {
      return <p>Loading...</p>
    }

    return <div>
      <Nodes name={this.props.name}
        version={this.props.service.Version}
        nodes={this.props.service.Nodes} />

      <Endpoints service={this.props.name}
        changeToQueryPage={this.props.changeToQueryPage}
        onQueryServiceChange={this.props.onQueryServiceChange}
        endpoints={this.props.service.Endpoints} />
    </div>
  }
})
