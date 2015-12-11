import React from 'react'
import Nodes from './nodes'
import Endpoints from './endpoints'
import ServiceTitle from './serviceTitle'

export default React.createClass({
  displayName: 'Service',

  propTypes: {
    service: React.PropTypes.object,
    fetchService: React.PropTypes.func,
    onNewQueryClick: React.PropTypes.func
  },

  getInitialState: function() {
    if (this.props.service) return { version: this.props.service.keys().next().value }

    return { version: null }
  },

  componentDidMount: function() {
    this.props.fetchService(this.props.name)
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.service) this.setState({ version: nextProps.service.keys().next().value })
  },

  _handleVersionChange: function(version) {
    this.setState({ version: version })
  },

  render: function() {
    if (!this.props.service) return <p>Loading...</p>

    const service = this.props.service.get(this.state.version)

    return <div>
      <ServiceTitle version={this.state.version}
        onVersionChange={this._handleVersionChange}
        versions={[...this.props.service.keys()]}
        name={service.Name}
        nodes={service.Nodes} />

      <Nodes name={service.Name}
        version={service.Version}
        nodes={service.Nodes} />

      <Endpoints service={service.Name}
        onNewQueryClick={this.props.onNewQueryClick}
        endpoints={service.Endpoints} />
    </div>
  }
})
