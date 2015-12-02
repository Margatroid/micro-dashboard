import React from 'react'

/* global require */
const ace = require('brace')
require('brace/mode/javascript')

export default React.createClass({
  displayName: 'Brace',

  componentWillUnmount: function() {
    this.editor.destroy()
  },

  componentDidUpdate: function() {
    this.editor.setValue(this.props.content, 1)
  },

  _mountEditor(domNode) {
    if (!domNode) return

    this.editor = ace.edit(domNode)
    this.editor.getSession().setMode('ace/mode/javascript')
    this.editor.setShowPrintMargin(false)
    this.editor.setValue(this.props.content, 1)
  },

  render: function() {
    return <div style={{width: '100%', height: '100%'}}
      ref={this._mountEditor} />
  }
})
