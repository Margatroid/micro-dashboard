import React from 'react'
import { Paper, Styles } from 'material-ui'
import { connect } from 'react-redux'
import { fetchRegistry } from '../actions'

import ServicesList from '../components/servicesList'

const Typography = Styles.Typography

const Explorer = React.createClass({
  displayName: 'Explorer',

  _loadServiceNames: function() {
    this.props.dispatch(fetchRegistry())
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

    return <section style={styles.wrapper}>
      <h1 style={styles.header}>Registry</h1>

      <Paper style={styles.paper} zDepth={1} rounded={false}>
        <ServicesList registry={this.props.registry}
          onComponentDidMount={this._loadServiceNames} />
      </Paper>
    </section>
  }
})

function select(state) {
  return { registry: state.registry }
}
export default connect(select)(Explorer)
