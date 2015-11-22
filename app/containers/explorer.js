import React from 'react'
import { Paper, Styles } from 'material-ui'
import { connect } from 'react-redux'
import { fetchRegistry } from '../actions'
import { pushState } from 'redux-router'

import Service from '../components/service'
import ServicesList from '../components/servicesList'

const Typography = Styles.Typography

const Explorer = React.createClass({
  displayName: 'Explorer',

  _loadServiceNames: function() {
    this.props.dispatch(fetchRegistry())
  },

  _onServiceClick: function(name, version) {
    this.props.dispatch(pushState(null, `/explorer/${name}/${version}`))
  },

  render: function() {
    const styles = {
      wrapper: {
        maxWidth: 960,
        margin: '100 auto 0 auto'
      },
      header: {
        fontSize: '24px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
        fontFamily: 'Roboto, sans-serif'
      },
      paper: {
        padding: 40
      }
    }

    let body
    if (this.props.children) {
      const serviceName = this.props.params.name
      const services = this.props.registry.services

      let serviceDetails
      if (services.has(serviceName)) {
        serviceDetails = services.get(serviceName).get(this.props.params.version)
      }

      body = <Service name={serviceName} service={serviceDetails} />
    } else {
      body = <ServicesList registry={this.props.registry}
        onServiceClick={this._onServiceClick}
        onComponentDidMount={this._loadServiceNames} />
    }

    return <section style={styles.wrapper}>
      <Paper style={styles.paper} zDepth={1} rounded={false}>{body}</Paper>
    </section>
  }
})

function select(state) {
  return { registry: state.registry }
}
export default connect(select)(Explorer)
