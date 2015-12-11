import React from 'react'
import { FloatingActionButton, FontIcon, Paper, Styles, SelectField } from 'material-ui'
import Brace from './brace'

const { Colors } = Styles

export default React.createClass({
  displayName: 'Editor',

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    registry: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired,
    onQueryServiceChange: React.PropTypes.func.isRequired,
    onQueryMethodChange: React.PropTypes.func.isRequired
  },

  _handleServiceChange: function(event) {
    this.props.onQueryServiceChange(event.target.value)
  },

  _handleMethodChange: function(event) {
    this.props.onQueryMethodChange(event.target.value)
  },

  _onSubmit: function() {
    const { service, method, body } = this.props.query
    this.props.onSubmit(service, method, body)
  },

  _onEditorChange(event, value) {
    this.props.onQueryBodyChange(value)
  },

  render: function() {
    const { registry, query } = this.props

    const styles = {
      marginRight: 20,
      flex: 1,
      padding: '20 40 40 40',
      display: 'flex',
      flexDirection: 'column',

      editor: {
        flexGrow: 2,
        display: 'flex',
        paddingTop: 40
      },

      controls: {
        display: 'flex',
        height: 160,

        fields: {
          width: '100%'
        },

        run: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 40
        }
      }
    }

    let serviceMenuItems = []
    let methodMenuItems = []
    if (registry.services.size) {
      for (let serviceName of registry.services.keys()) {
        serviceMenuItems.push({ payload: serviceName, text: serviceName })
      }

      // If we've selected a service to query.
      if (query.service) {
        const selectedService = registry.services.get(query.service)

        // If we have fetched the endpoint data.
        if (selectedService) {
          const endpoints = selectedService.values().next().value.Endpoints
          methodMenuItems = endpoints.map((endpoint) => {
            return { payload: endpoint.Name, text: endpoint.Name }
          })
        }
      }
    }

    return <Paper style={styles} zDepth={1} rounded={false}>
      <div style={styles.controls}>
        <div style={styles.controls.fields}>
          <SelectField
            value={query.service}
            floatingLabelText='Service'
            onChange={this._handleServiceChange}
            style={styles.controls.fields.name}
            fullWidth={true}
            menuItems={serviceMenuItems} />

          <SelectField
            value={query.method}
            floatingLabelText='Method'
            onChange={this._handleMethodChange}
            disabled={!methodMenuItems.length}
            style={styles.controls.fields.method}
            fullWidth={true}
            menuItems={methodMenuItems} />
        </div>

        <div style={styles.controls.run}>
          <FloatingActionButton onClick={this._onSubmit}>
            <FontIcon style={{fontSize: 55}}
              color={Colors.pink50}
              className='material-icons'>play_arrow</FontIcon>
          </FloatingActionButton>
        </div>
      </div>

      <div style={styles.editor}>
        <Brace onChange={this._onEditorChange} content={this.props.query.body} />
      </div>
    </Paper>
  }
})
