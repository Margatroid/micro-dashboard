import React from 'react'
import { Card, CardActions, CardHeader, CardText, CardTitle, FontIcon, RaisedButton, Styles } from 'material-ui'

function formatEndpoint(input, indentLevel) {
  if (!input) return ''

  const indent = Array(indentLevel).join('    ')
  const fieldSeparator = `,\n`

  if (input.Values) {
    return `${indent}${input.Type} ${input.Name} {
${input.Values.map((field) => formatEndpoint(field, indentLevel + 1)).join(fieldSeparator)}
${indent}}`
  }

  return `${indent}${input.Type} ${input.Name}`
}

const { Colors } = Styles

export default React.createClass({
  displayName: 'Endpoints',

  propTypes: {
    endpoints: React.PropTypes.array.isRequired,
    service: React.PropTypes.string.isRequired,
    changeToQueryPage: React.PropTypes.func.isRequired,
    onQueryServiceChange: React.PropTypes.func.isRequired
  },

  _onNewQueryClick: function(endpoint) {
    this.props.onQueryServiceChange(this.props.service, endpoint.Name)
    this.props.changeToQueryPage()
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
        return <Card key={endpoint.Name}
          initiallyExpanded={false}>

          <CardHeader title={endpoint.Name}
            subtitle={JSON.stringify(endpoint.Metadata)}
            actAsExpander={true}
            avatar={endpointIcon}
            showExpandableButton={true}>
          </CardHeader>

          <div style={styles.endpoint} expandable={true}>
            <CardActions style={styles.endpoint.newQuery}>
              <RaisedButton onClick={() => {
                this._onNewQueryClick(endpoint) }}
                primary={true}
                label='Create new query'/>
            </CardActions>

            <CardText>
              <pre>
                <code>
                  {formatEndpoint(endpoint.Request, 1)}
                </code>
              </pre>

              <br/>

              <pre>
                <code>
                  {formatEndpoint(endpoint.Response, 1)}
                </code>
              </pre>
            </CardText>
          </div>
        </Card>
      })}
    </div>
  }
})
