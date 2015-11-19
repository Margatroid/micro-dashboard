import React from 'react'
import { CardTitle, FloatingActionButton, FontIcon, Styles, TextField } from 'material-ui'
import Brace from './brace'

const { Colors } = Styles

export default React.createClass({
  displayName: 'Editor',

  render: function() {
    const styles = {
      editor: {
        height: this.props.height - 500,
        marginTop: 50
      },
      title: {
        float: 'left',
        padding: 0
      }
    }

    return <div>
      <CardTitle style={styles.title} title='Editor'/>

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

      <div style={styles.editor}>
        <Brace />
      </div>
    </div>
  }
})
