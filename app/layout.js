import React from 'react'
import { AppBar, FontIcon, Styles, Tabs, Tab } from 'material-ui'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
import { fetchQueryResponse, fetchRegistry, setQueryService, setQueryMethod, setQueryBody } from './actions'

const { Colors } = Styles

const Layout = React.createClass({
  displayName: 'Layout',

  _handleQueryServiceChange: function(service, method) {
    this.props.dispatch(setQueryService(service, method))
  },

  _handleQueryMethodChange: function(method) {
    this.props.dispatch(setQueryMethod(method))
  },

  _handleQueryBodyChange: function(body) {
    this.props.dispatch(setQueryBody(body))
  },

  _handleEditorSubmit: function(service, method, request) {
    this.props.dispatch(fetchQueryResponse(service, method, request))
  },

  _changeToExplorerPage: function() {
    this.props.dispatch(pushState(null, '/explorer'))
  },

  _changeToQueryPage: function() {
    this.props.dispatch(pushState(null, '/query'))
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
        onQueryMethodChange: this._handleQueryMethodChange,
        onQueryBodyChange: this._handleQueryBodyChange,
        changeToQueryPage: this._changeToQueryPage,
        onEditorSubmit: this._handleEditorSubmit
      }

      return React.cloneElement(child, additionalProps)
    })

    const tabsValue = (this.props.router.location.pathname == '/query') ? '/query' : '/explorer'

    return <div>
      <AppBar style={appBarStyle} zDepth={0} iconElementLeft={icon} title='Micro dashboard'>
        <Tabs initialSelectedIndex={initialSelectedIndex}
          value={tabsValue}
          style={{width: 400}}>

          <Tab onClick={this._changeToExplorerPage} label='EXPLORER' value='/explorer' route='/explorer' />
          <Tab onClick={this._changeToQueryPage} label='QUERY TOOL' value='/query' route='/query' />
	</Tabs>
      </AppBar>

      <div style={{marginTop: 64}}>
        {children}
      </div>
    </div>
  }
})

function select(state) {
  const { app } = state

  const query = {
    isFetching: app.isFetchingQuery,
    response: app.queryResponse,
    service: app.queryService,
    method: app.queryMethod,
    body: app.queryBody
  }

  const registry = {
    services: app.registry,
    isFetching: app.isFetchingRegistry
  }

  return { router: state.router, query: query, registry: registry }
}
export default connect(select)(Layout)
