import React from 'react'
import { Card, CardActions, CardHeader, CardText, CardTitle, FontIcon, RaisedButton, Styles } from 'material-ui'

function formatEndpoint(input, indentLevel) {
  if (!input) return ''

  const indent = Array(indentLevel).join('    ')
  const fieldSeparator = `,\n`

  if (input.values) {
    return `${indent}${input.type} ${input.name} {
${input.values.map((field) => formatEndpoint(field, indentLevel + 1)).join(fieldSeparator)}
${indent}}`
  }

  return `${indent}${input.type} ${input.name}`
}

const { Colors } = Styles

export default React.createClass({
  displayName: 'Endpoints',

  propTypes: {
    endpoints: React.PropTypes.array,
    service: React.PropTypes.string.isRequired,
    onNewQueryClick: React.PropTypes.func
  },

  _onNewQueryClick: function(endpoint) {
    this.props.onNewQueryClick(this.props.service, endpoint)
  },

  render: function() {
    if (!this.props.endpoints) {
      return <div style={{marginTop: 50}}>
        <CardTitle subtitle='No endpoints found' />
      </div>
    }

    const numEndpoints = this.props.endpoints.length
    const subtitle = `${numEndpoints} endpoint${(numEndpoints > 1) ? 's' : ''}`

    const styles = {
      endpoint: {
        padding: 20,
        newQuery: { textAlign: 'center' }
      }
    }

    const endpointIcon = <FontIcon style={{fontSize: 36}}
      className='material-icons'
      color={Colors.grey400}>code</FontIcon>

    return <div style={{marginTop: 50}}>
      <CardTitle subtitle={subtitle} />

      {this.props.endpoints.map((endpoint) => {
        return <Card key={endpoint.name}
          initiallyExpanded={false}>

          <CardHeader title={endpoint.name}
            subtitle={JSON.stringify(endpoint.metadata)}
            actAsExpander={true}
            avatar={endpointIcon}
            showExpandableButton={true}>
          </CardHeader>

          <div style={styles.endpoint} expandable={true}>
            <CardActions style={styles.endpoint.newQuery}>
              <RaisedButton onClick={() => {
                this._onNewQueryClick(endpoint.name) }}
                primary={true}
                label='Create new query'/>
            </CardActions>

            <CardText>
              <pre>
                <code>
                  {formatEndpoint(endpoint.request, 1)}
                </code>
              </pre>

              <br/>

              <pre>
                <code>
                  {formatEndpoint(endpoint.response, 1)}
                </code>
              </pre>
            </CardText>
          </div>
        </Card>
      })}
    </div>
  }
})
