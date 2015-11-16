import React from 'react'
import { Paper } from 'material-ui'
import Editor from '../components/editor'

export default React.createClass({
  displayName: 'Query',

  _getStyles: function() {
    return {
      wrapper: {
        margin: '100px 40px',
        display: 'flex'
      },
      editor: {
        marginRight: 20,
        flex: 1,
        padding: 40
      },
      results: {
        marginLeft: 20,
        flex: 1,
        padding: 20
      }
    }
  },

  render: function() {
    const styles = this._getStyles()

    return <section style={styles.wrapper}>
      <Paper style={styles.editor} zDepth={1} rounded={false}>
        <Editor />
      </Paper>

      <Paper style={styles.results} zDepth={1} rounded={false}>
      </Paper>
    </section>
  }
})
