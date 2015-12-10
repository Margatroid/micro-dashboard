import React from 'react'
import { Paper, Styles } from 'material-ui'

import Service from '../components/service'
import ServicesList from '../components/servicesList'

const Typography = Styles.Typography

export default React.createClass({
  displayName: 'Explorer',

  propTypes: {
    fetchService: React.PropTypes.func
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
      // When viewing one service.
      body = <Service name={serviceName}
        changeToQueryPage={this.props.changeToQueryPage}
        onQueryServiceChange={this.props.onQueryServiceChange}
        onQueryMethodChange={this.props.onQueryMethodChange}
        fetchService={this.props.fetchService}
        service={this.props.registry.services.get(serviceName)} />
    } else {
      // When viewing the index of all services.
      body = <ServicesList registry={this.props.registry}
        fetchRegistry={this.props.fetchRegistry}
        onServiceClick={this.props.navigateToService} />
    }

    return <section style={styles.wrapper}>
      <Paper style={styles.paper} zDepth={1} rounded={false}>{body}</Paper>
    </section>
  }
})
