import React from 'react'
import Nodes from './nodes'
import { CardTitle } from 'material-ui'

export default React.createClass({
  displayName: 'Service',

  render: function() {
    return <div>
      <Nodes name={this.props.name} nodes={this.props.service.Nodes} />
    </div>
  }
})
