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

  render: function() {
    if (!this.props.service) return <p>Loading...</p>

    const service = this.props.service.values().next().value

    return <div>
      <VersionDropdown versions={[...this.props.service.keys()]} />

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
