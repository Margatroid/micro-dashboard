import React from 'react'
import Nodes from './nodes'
import Endpoints from './endpoints'

export default React.createClass({
  displayName: 'Service',

  propTypes: {
    service: React.PropTypes.object,
    onQueryServiceChange: React.PropTypes.func,
    onQueryMethodChange: React.PropTypes.func,
    fetchService: React.PropTypes.func
  },

  componentDidMount: function() {
    this.props.fetchService(this.props.name)
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
        onQueryMethodChange={this.props.onQueryMethodChange}
        endpoints={this.props.service.Endpoints} />
    </div>
  }
})
