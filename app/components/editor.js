import React from 'react'
import { FloatingActionButton, FontIcon, Styles, SelectField } from 'material-ui'
import Brace from './brace'

const { Colors } = Styles

export default React.createClass({
  displayName: 'Editor',

  propTypes: {
    submit: React.PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    registry: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired,
    onQueryServiceChange: React.PropTypes.func.isRequired,
    onQueryMethodChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      service: '',
      method: '',
      request: ''
    }
  },

  _handleServiceChange: function(event) {
    // @TODO: Move this new endpoint logic to the reducer.
    const service = this.props.registry.services.get(event.target.value).values().next().value

    let newEndpoint = ''
    if (service.Endpoints) newEndpoint = service.Endpoints[0].Name

    this.props.onQueryServiceChange(event.target.value, newEndpoint)
  },

  _handleMethodChange: function(event) {
    this.props.onQueryMethodChange(event.target.value)
  },

  _onSubmit: function() {
    this.props.submit(this.state.service, this.state.method, this.state.request)
  },

  render: function() {
    const { height, registry, query } = this.props

    const styles = {
      editor: {
        height: height - 350,
        marginTop: 50
      },
      nameField: {
        marginRight: 50
      }
    }

    let serviceMenuItems = []
    let methodMenuItems = []
    if (registry.services.size) {
      for (let serviceName of registry.services.keys()) {
        serviceMenuItems.push({ payload: serviceName, text: serviceName })
      }

      if (query.service) {
        const selectedService = registry.services.get(query.service).values().next().value
        if (selectedService.Endpoints) {
          methodMenuItems = selectedService.Endpoints.map((endpoint) => {
            return { payload: endpoint.Name, text: endpoint.Name }
          })
        }
      }
    }

    return <div>
      <FloatingActionButton onClick={this._onSubmit} style={{float: 'right'}}>
        <FontIcon style={{fontSize: 55}}
          color={Colors.pink50}
          className='material-icons'>play_arrow</FontIcon>
      </FloatingActionButton>

      <SelectField
        value={query.service}
        floatingLabelText='Service'
        onChange={this._handleServiceChange}
        style={styles.nameField}
        menuItems={serviceMenuItems} />

      <SelectField
        value={query.method}
        floatingLabelText='Method'
        onChange={this._handleMethodChange}
        disabled={!methodMenuItems.length}
        menuItems={methodMenuItems} />

      <div style={styles.editor}>
        <Brace />
      </div>
    </div>
  }
})
