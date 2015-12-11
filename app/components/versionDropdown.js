import React from 'react'
import { SelectField } from 'material-ui'

export default React.createClass({
  displayName: 'VersionDropdown',

  propTypes: {
    versions: React.PropTypes.array.isRequired,
    version: React.PropTypes.string.isRequired
  },

  render: function() {
    const menuItems =
      this.props.versions.map((version) => ({ payload: version, text: version }))

    return <SelectField
      value={this.props.version}
      floatingLabelText='Change version'
      menuItems={menuItems} />
  }
})
