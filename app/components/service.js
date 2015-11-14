import React from 'react'
import Nodes from './nodes'
import { CardTitle } from 'material-ui'

export default React.createClass({
  displayName: 'Service',

  render: function() {
    const numNodes = this.props.service.Nodes.length
    const subtitle = `${numNodes} node${(numNodes > 1) ? 's' : ''}`

    return <div>
      <CardTitle title={this.props.name} subtitle={subtitle} />
      <Nodes name={this.props.name} nodes={this.props.service.Nodes} />
    </div>
  }
})
