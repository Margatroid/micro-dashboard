import React from 'react'
import { SelectField } from 'material-ui'

export default React.createClass({
  displayName: 'VersionDropdown',

  propTypes: {
    versions: React.PropTypes.array.isRequired,
    version: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  _handleVersionChange: function(event) {
    this.props.onChange(event.target.value)
  },

  render: function() {
    const menuItems =
      this.props.versions.map((version) => ({ payload: version, text: version }))

    return <SelectField
      value={this.props.version}
      onChange={this._handleVersionChange}
      floatingLabelText='Version'
      menuItems={menuItems} />
  }
})
