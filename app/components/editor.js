import React from 'react'
import { FloatingActionButton, FontIcon, Styles, TextField } from 'material-ui'
import Brace from './brace'

const { Colors } = Styles

export default React.createClass({
  displayName: 'Editor',

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
      <FloatingActionButton style={{float: 'right'}}>
        <FontIcon style={{fontSize: 55}}
          color={Colors.pink50}
          className='material-icons'>play_arrow</FontIcon>
      </FloatingActionButton>

      <TextField hintText='Service name'
        style={styles.nameField}
        floatingLabelText='Service name' />

      <TextField hintText='Method'
        floatingLabelText='Method' />

      <div style={styles.editor}>
        <Brace />
      </div>
    </div>
  }
})
