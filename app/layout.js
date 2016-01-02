import React from 'react'
import { AppBar, FontIcon, Styles, Tabs, Tab } from 'material-ui'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
import { fetchQueryResponse,
  fetchRegistry,
  fetchService,
  setQueryService,
  setQueryMethod,
  setQueryBody } from './actions'

const { Colors } = Styles

const Layout = React.createClass({
  displayName: 'Layout',

  _handleCreateNewQuery: function(service, endpoint) {
    this._handleQueryServiceChange(service)
    this._handleQueryMethodChange(endpoint)
    this._changeToQueryPage()
  },

  _handleQueryServiceChange: function(service) {
    this.props.dispatch(setQueryService(service))
    this._fetchService(service)
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

  _fetchRegistry: function() {
    this.props.dispatch(fetchRegistry())
  },

  _fetchService: function(service) {
    this.props.dispatch(fetchService(service))
  },

  _changeToExplorerPage: function() {
    this.props.dispatch(pushState(null, '/dashboard/explorer'))
  },

  _changeToQueryPage: function() {
    this.props.dispatch(pushState(null, '/dashboard/query'))
  },

  _navigateToService(name) {
    this.props.dispatch(pushState(null, `/dashboard/explorer/${name}`))
  },

  render: function() {
    const iconStyle = {
      marginTop: 11,
      marginLeft: 20,
      marginRight: 20
    }

    const icon = <FontIcon style={iconStyle}
      onClick={this._changeToExplorerPage}
      className='material-icons'
      color={Colors.grey50}>cloud</FontIcon>

    const title = <span onClick={this._changeToExplorerPage}>Micro dashboard</span>

    const appBarStyle = {position: 'absolute', top: 0, left: 0}
    const initialSelectedIndex = this.props.location.pathname.includes('/query') ? 1 : 0

    const children = React.Children.map(this.props.children, (child) => {
      let additionalProps = {
        registry: this.props.registry,
        query: this.props.query,
        navigateToService: this._navigateToService,
        fetchService: this._fetchService,
        fetchRegistry: this._fetchRegistry,
        onQueryServiceChange: this._handleQueryServiceChange,
        onQueryMethodChange: this._handleQueryMethodChange,
        onQueryBodyChange: this._handleQueryBodyChange,
        onNewQueryClick: this._handleCreateNewQuery,
        onEditorSubmit: this._handleEditorSubmit
      }

      return React.cloneElement(child, additionalProps)
    })

    const tabsValue = (this.props.router.location.pathname == '/query') ? '/query' : '/explorer'

    return <div>
      <AppBar style={appBarStyle} zDepth={0} iconElementLeft={icon} title={title}>
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
