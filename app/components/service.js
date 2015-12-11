import React from 'react'
import Nodes from './nodes'
import Endpoints from './endpoints'
import VersionDropdown from './versionDropdown'

export default React.createClass({
  displayName: 'Service',

  propTypes: {
    service: React.PropTypes.object,
    onQueryServiceChange: React.PropTypes.func,
    onQueryMethodChange: React.PropTypes.func,
    changeToQueryPage: React.PropTypes.func,
    fetchService: React.PropTypes.func
  },

  componentDidMount: function() {
    this.props.fetchService(this.props.name)
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.service) this.setState({ version: nextProps.service.keys().next().value })
  },

  render: function() {
    if (!this.props.service) return <p>Loading...</p>

    const service = this.props.service.get(this.state.version)

    return <div>
      <VersionDropdown version={this.state.version}
        versions={[...this.props.service.keys()]} />

      <Nodes name={service.Name}
        version={service.Version}
        nodes={service.Nodes} />

      <Endpoints service={service.Name}
        changeToQueryPage={this.props.changeToQueryPage}
        onQueryServiceChange={this.props.onQueryServiceChange}
        onQueryMethodChange={this.props.onQueryMethodChange}
        endpoints={service.Endpoints} />
    </div>
  }
})
