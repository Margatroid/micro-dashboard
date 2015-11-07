import React from 'react'
import { AppBar, FontIcon, Tabs, Tab } from 'material-ui'

export default React.createClass({
  render: function() {
    const icon = <FontIcon className='material-icons' color='white'>cloud</FontIcon>

    return <div>
      <AppBar iconElementLeft={icon} title='Micro dashboard'>
	<Tabs>
	  <Tab label='Explorer' />
	  <Tab label='Query Tool' />
	  <Tab label='API' />
	</Tabs>
      </AppBar>
    </div>
  }
})
