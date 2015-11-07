import React from 'react'
import { AppBar, FontIcon } from 'material-ui'

export default React.createClass({
  render: function() {
    const icon = <FontIcon className="material-icons" color='white'>cloud</FontIcon>
    return <AppBar iconElementLeft={icon} title='Micro dashboard'/>
  }
})
