import React from 'react'

/* global require */
const ace = require('brace')
require('brace/mode/javascript')

export default React.createClass({
  displayName: 'Brace',

  propTypes: {
    content: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

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
    this.editor.getSession().setUseWrapMode(true)
    this.editor.setShowPrintMargin(false)
    this.editor.$blockScrolling = Infinity
    this.editor.setValue(this.props.content, 1)

    if (this.props.onChange) {
      this.editor.on('blur', (event) => {
        this.props.onChange(event, this.editor.getValue())
      })
    }
  },

  render: function() {
    return <div style={{width: '100%'}}
      ref={this._mountEditor} />
  }
})
