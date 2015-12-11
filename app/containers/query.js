import React from 'react'
import { CardTitle, Paper } from 'material-ui'
import Brace from '../components/brace'
import Editor from '../components/editor'

export default React.createClass({
  displayName: 'Query',

  getInitialState: function() {
    return this._getState()
  },

  _getState: function() {
    return { editorHeight: window.innerHeight }
  },

  _handleResize: function() {
    this.setState(this._getState())
  },

  _getStyles: function() {
    return {
      wrapper: {
        margin: '100px 40px 0 40px',
        display: 'flex',
        height: this.state.editorHeight - 150
      },
      results: {
        marginLeft: 20,
        flex: 1,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',

        title: {
          height: 50
        },
        editor: {
          flexGrow: 2,
          display: 'flex'
        }
      }
    }
  },

  componentDidMount: function() {
    window.addEventListener('resize', this._handleResize)
    this.props.fetchRegistry()
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._handleResize)
  },

  render: function() {
    const styles = this._getStyles()

    return <section style={styles.wrapper}>
      <Editor onSubmit={this.props.onEditorSubmit}
        registry={this.props.registry}
        query={this.props.query}
        onQueryServiceChange={this.props.onQueryServiceChange}
        onQueryMethodChange={this.props.onQueryMethodChange}
        onQueryBodyChange={this.props.onQueryBodyChange}
        height={this.state.editorHeight} />

      <Paper style={styles.results} zDepth={1} rounded={false} >
        <CardTitle style={styles.results.title} title='Response' />
        <div style={styles.results.editor}>
          <Brace content={JSON.stringify(this.props.query.response, null, 4)} />
        </div>
      </Paper>
    </section>
  }
})
