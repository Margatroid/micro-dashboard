import React from 'react'
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui'

export default React.createClass({
  displayName: 'Nodes',

  propTypes: {
    nodes: React.PropTypes.array.isRequired
  },

  render: function() {
    const widths = {
      address: { width: '15%' },
      port: { width: '12%' },
      metadata: { width: '10%' }
    }

    return <div>
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn style={widths.address}>Address</TableHeaderColumn>
            <TableHeaderColumn style={widths.port}>Port</TableHeaderColumn>
            <TableHeaderColumn style={widths.metadata}>Metadata</TableHeaderColumn>
          </TableRow>

          {/* Hack to stop checkbox from showing */}
          <TableRow style={{display: 'none'}} />
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {this.props.nodes.map((node) => {
            return <TableRow key={node.id}>
              <TableRowColumn>{node.id}</TableRowColumn>
              <TableRowColumn style={widths.address}>{node.address}</TableRowColumn>
              <TableRowColumn style={widths.port}>{node.port}</TableRowColumn>
              <TableRowColumn style={widths.metadata}>{JSON.stringify(node.metadata)}</TableRowColumn>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  }
})
