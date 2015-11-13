import React from 'react'
import { FontIcon, List, ListItem, Styles } from 'material-ui'
const { Colors } = Styles

export default React.createClass({
  displayName: 'ServicesList',

  propTypes: {
    registry: React.PropTypes.object.isRequired,
    onComponentDidMount: React.PropTypes.func.isRequired,
    onServiceClick: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this.props.onComponentDidMount()
  },

  render: function() {
    const serviceIcon = <FontIcon style={{fontSize: 42}}
      className='material-icons'
      color={Colors.grey400}>
      widgets
    </FontIcon>

    let services = []
    for (let name of this.props.registry.services.keys()) {
      services.push(name)
    }

    return <div>
      <List subheader='Services'>
        {services.map((name) =>
          <ListItem
            key={name}
            leftAvatar={serviceIcon}
            primaryText={name}
            onClick={() => {this.props.onServiceClick(name)}}
            secondaryText='Something something description' />
        )}
      </List>
    </div>
  }
})
