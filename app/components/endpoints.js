import React from 'react'
import { Card, CardActions, CardHeader, CardTitle, FlatButton, FontIcon, Styles } from 'material-ui'
const { Colors } = Styles

export default React.createClass({
  displayName: 'Endpoints',

  render: function() {
    const numEndpoints = this.props.endpoints.length
    const subtitle = `${numEndpoints} endpoint${(numEndpoints > 1) ? 's' : ''}`

    const endpointIcon = <FontIcon style={{fontSize: 36}}
      className='material-icons'
      color={Colors.grey400}>code</FontIcon>

    return <div style={{marginTop: 50}}>
      <CardTitle subtitle={subtitle} />

      {this.props.endpoints.map((endpoint) => {
        return <Card key={endpoint.Name} initiallyExpanded={false}>
          <CardHeader title={endpoint.Name}
            subtitle={JSON.stringify(endpoint.Metadata)}
            actAsExpander={true}
            avatar={endpointIcon}
            showExpandableButton={true}>
          </CardHeader>

          <CardActions expandable={true}>
            <FlatButton label='New query'/>
          </CardActions>
        </Card>
      })}
    </div>
  }
})
