import React from 'react'
import { CardTitle } from 'material-ui'
import VersionDropdown from './versionDropdown'

export default React.createClass({
  displayName: 'ServiceTitle',

  propTypes: {
    version: React.PropTypes.string.isRequired,
    versions: React.PropTypes.array.isRequired,
    onVersionChange: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    nodes: React.PropTypes.array.isRequired
  },

  render: function() {
    const numNodes = this.props.nodes.length
    const subtitle =
      `Version ${this.props.version} - ${numNodes} node${(numNodes > 1) ? 's' : ''}`

    const styles = {
      display: 'flex'
    }

    return <div style={styles}>
      <CardTitle style={{flexGrow: 2}} title={this.props.name} subtitle={subtitle} />

      <VersionDropdown version={this.props.version}
        onChange={this.props.onVersionChange}
        versions={this.props.versions} />
    </div>
  }
})
