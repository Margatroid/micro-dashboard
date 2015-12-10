import React from 'react'
import { Paper, Styles } from 'material-ui'

import Service from '../components/service'
import ServicesList from '../components/servicesList'

const Typography = Styles.Typography

export default React.createClass({
  displayName: 'Explorer',

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
      // When viewing one service.
      const serviceName = this.props.params.name
      const services = this.props.registry.services

      let serviceDetails
      if (services.has(serviceName)) {
        serviceDetails = services.get(serviceName).get(this.props.params.version)
      }

      body = <Service name={serviceName}
        changeToQueryPage={this.props.changeToQueryPage}
        onQueryServiceChange={this.props.onQueryServiceChange}
        onQueryMethodChange={this.props.onQueryMethodChange}
        service={serviceDetails} />
    } else {
      // When viewing the index of all services.
      body = <ServicesList registry={this.props.registry}
        onServiceClick={this.props.navigateToService} />
    }

    return <section style={styles.wrapper}>
      <Paper style={styles.paper} zDepth={1} rounded={false}>{body}</Paper>
    </section>
  }
})
