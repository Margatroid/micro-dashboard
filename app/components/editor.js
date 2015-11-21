import React from 'react'
import { FloatingActionButton, FontIcon, Styles, TextField } from 'material-ui'
import Brace from './brace'

const { Colors } = Styles

export default React.createClass({
  displayName: 'Editor',

  propTypes: {
    submit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      service: '',
      method: '',
      request: ''
    }
  },

  _handleServiceChange: function(event) {
    this.setState({ service: event.target.value })
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

    return <div>
      <FloatingActionButton onClick={this._onSubmit} style={{float: 'right'}}>
        <FontIcon style={{fontSize: 55}}
          color={Colors.pink50}
          className='material-icons'>play_arrow</FontIcon>
      </FloatingActionButton>

      <TextField hintText='Service name'
        onChange={this._handleServiceChange}
        value={this.state.service}
        style={styles.nameField}
        floatingLabelText='Service name' />

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
