import React from 'react'
import { DropDownMenu } from 'material-ui'

export default React.createClass({
  displayName: 'VersionDropdown',

  propTypes: {
    versions: React.PropTypes.array.isRequired
  },

  render: function() {
    const menuItems = this.props.versions.map((version) => ({ payload: version, text: version }))
    return <DropDownMenu menuItems={menuItems} />
  }
})
