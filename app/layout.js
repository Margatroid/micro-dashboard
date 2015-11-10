import React from 'react'
import { AppBar, FontIcon, Styles, Tabs, Tab } from 'material-ui'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
const { Colors } = Styles

const Layout = React.createClass({
  displayName: 'Layout',

  _handleTabChange: function(value, e, tab) {
    const { dispatch } = this.props
    dispatch(pushState(null, tab.props.route))
  },

  render: function() {
    const iconStyle = {
      marginTop: 11,
      marginLeft: 20,
      marginRight: 20
    }

    const icon = <FontIcon style={iconStyle}
      className='material-icons'
      color={Colors.grey50}>cloud</FontIcon>

    const appBarStyle = {position: 'absolute', top: 0, left: 0}

    return <div>
      <AppBar style={appBarStyle} zDepth={0} iconElementLeft={icon} title='Micro dashboard'>
	<Tabs onChange={this._handleTabChange} style={{width: 400}}>
          <Tab label='EXPLORER' route='/explorer' />
          <Tab label='QUERY TOOL' route='/query' />
	</Tabs>
      </AppBar>

      <div style={{marginTop: 64}}>
        {this.props.children}
      </div>
    </div>
  }
})

function select(state) {
  return state
}

export default connect(select)(Layout)
