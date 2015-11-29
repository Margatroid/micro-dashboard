import React from 'react'
import { Paper } from 'material-ui'
import Editor from '../components/editor'
import { fetchQueryResponse } from '../actions'

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

  _submitQuery: function(service, method, request) {
    this.props.dispatch(fetchQueryResponse(service, method, request))
  },

  _getStyles: function() {
    return {
      wrapper: {
        margin: '100px 40px 0 40px',
        display: 'flex',
        height: this.state.editorHeight - 150
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

  componentDidMount: function() {
    window.addEventListener('resize', this._handleResize)
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._handleResize)
  },

  render: function() {
    const styles = this._getStyles()

    return <section style={styles.wrapper}>
      <Paper style={styles.editor} zDepth={1} rounded={false}>
        <Editor submit={this._submitQuery}
          registry={this.props.registry}
          query={this.props.query}
          onQueryServiceChange={this.props.onQueryServiceChange}
          onQueryMethodChange={this.props.onQueryMethodChange}
          height={this.state.editorHeight} />
      </Paper>

      <Paper style={styles.results} zDepth={1} rounded={false} />
    </section>
  }
})
