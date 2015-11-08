import React from 'react'
import { Paper, Styles } from 'material-ui'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MicroDashboardApp from '../reducers'
import ServicesList from '../components/servicesList'

const Typography = Styles.Typography
let store = createStore(MicroDashboardApp)

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

    return <section style={styles.wrapper}>
      <h1 style={styles.header}>Registry</h1>

      <Paper style={styles.paper} zDepth={1} rounded={false}>
        <Provider store={store}>
          <ServicesList/>
        </Provider>
      </Paper>
    </section>
  }
})
