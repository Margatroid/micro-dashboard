import React from 'react'

/* global require */
const ace = require('brace')
require('brace/mode/javascript')

export default React.createClass({
  displayName: 'Brace',

  componentWillUnmount: function() {
  },

  _mountEditor(domNode) {
    this.editor = ace.edit(domNode)
    this.editor.getSession().setMode('ace/mode/javascript')
  },

  render: function() {
    return <div style={{width: '100%', height: 400}} ref={this._mountEditor}>
    </div>
  }
})
