import React from 'react'
import { AppBar, FontIcon, Styles, Tabs, Tab } from 'material-ui'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
import { fetchRegistry, setQueryService, setQueryMethod } from './actions'

const { Colors } = Styles

const Layout = React.createClass({
  displayName: 'Layout',

  _handleQueryServiceChange: function(service, method) {
    this.props.dispatch(setQueryService(service, method))
  },

  _handleQueryMethodChange: function(method) {
    this.props.dispatch(setQueryMethod(method))
  },

  _handleTabChange: function(value, e, tab) {
    this.props.dispatch(pushState(null, tab.props.route))
  },

  _navigateToService(name, version) {
    this.props.dispatch(pushState(null, `/explorer/${name}/${version}`))
  },

  componentDidMount: function() {
    this.props.dispatch(fetchRegistry())
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
    const initialSelectedIndex = this.props.location.pathname.includes('/query') ? 1 : 0

    const children = React.Children.map(this.props.children, (child) => {
      let additionalProps = {
        registry: this.props.registry,
        query: this.props.query,
        navigateToService: this._navigateToService,
        onQueryServiceChange: this._handleQueryServiceChange,
        onQueryMethodChange: this._handleQueryMethodChange
      }

      return React.cloneElement(child, additionalProps)
    })

    return <div>
      <AppBar style={appBarStyle} zDepth={0} iconElementLeft={icon} title='Micro dashboard'>
        <Tabs initialSelectedIndex={initialSelectedIndex}
          onChange={this._handleTabChange}
          style={{width: 400}}>

          <Tab label='EXPLORER' route='/explorer' />
          <Tab label='QUERY TOOL' route='/query' />
	</Tabs>
      </AppBar>

      <div style={{marginTop: 64}}>
        {children}
      </div>
    </div>
  }
})

function select(state) {
  return { query: state.query, registry: state.registry }
}
export default connect(select)(Layout)
