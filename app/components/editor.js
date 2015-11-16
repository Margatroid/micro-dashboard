import React from 'react'
import { CardTitle, FloatingActionButton, FontIcon, Styles, TextField } from 'material-ui'

const { Colors } = Styles

export default React.createClass({
  displayName: 'Editor',

  render: function() {
    return <div>
      <CardTitle style={{float: 'left', padding: 0}} title='Editor'/>

      <FloatingActionButton style={{float: 'right'}}>
        <FontIcon style={{fontSize: 55}}
          color={Colors.pink50}
          className='material-icons'>play_arrow</FontIcon>
      </FloatingActionButton>

      <TextField hintText='Service name'
        fullWidth={true}
        floatingLabelText='Service name' />

      <TextField hintText='Method'
        fullWidth={true}
        floatingLabelText='Method' />
    </div>
  }
})
