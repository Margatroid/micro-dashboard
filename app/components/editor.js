import React from 'react'
import { FloatingActionButton, FontIcon, Styles, SelectField, TextField } from 'material-ui'
import Brace from './brace'

const { Colors } = Styles

export default React.createClass({
  displayName: 'Editor',

  propTypes: {
    submit: React.PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    registry: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      service: '',
      method: '',
      request: ''
    }
  },

  _handleServiceChange: function(event) {
    this.props.onQueryServiceChange(event.target.value)
  },

  _handleMethodChange: function(event) {
    this.setState({ method: event.target.value })
  },

  _onSubmit: function() {
    this.props.submit(this.state.service, this.state.method, this.state.request)
  },

  render: function() {
    const styles = {
      editor: {
        height: this.props.height - 350,
        marginTop: 50
      },
      nameField: {
        marginRight: 50
      }
    }

    let serviceMenuItems = []
    if (this.props.registry.services.size) {
      for (let serviceName of this.props.registry.services.keys()) {
        serviceMenuItems.push({ payload: serviceName, text: serviceName })
      }
    }

    return <div>
      <FloatingActionButton onClick={this._onSubmit} style={{float: 'right'}}>
        <FontIcon style={{fontSize: 55}}
          color={Colors.pink50}
          className='material-icons'>play_arrow</FontIcon>
      </FloatingActionButton>

      <SelectField
        value={this.props.query.service}
        floatingLabelText='Service name'
        hintText='Loading services...'
        onChange={this._handleServiceChange}
        menuItems={serviceMenuItems} />

      <TextField hintText='Method'
        onChange={this._handleMethodChange}
        value={this.state.method}
        floatingLabelText='Method' />

      <div style={styles.editor}>
        <Brace />
      </div>
    </div>
  }
})
