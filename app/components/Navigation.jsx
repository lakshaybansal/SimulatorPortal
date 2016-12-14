import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

var Navigation = React.createClass({
  getInitialState:function(){
     return {open: false};
  },
  handleToggle:function(){
  this.setState({open: !this.state.open});
},
handleMetricClose:function(){
  this.setState({open: false});
  window.location.hash = '#/Metricshome';
},
handleThingClose:function(){
  this.setState({open: false});
  window.location.hash = '#/Thingshome';
},
handleHomeClose:function(){
  this.setState({open: false});
  window.location.hash = '#/';
},
  render: function(){
    return (
      <div>
          <AppBar title="Datonis Portal" onLeftIconButtonTouchTap={this.handleToggle} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <Drawer docked={false}
              width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
            <MenuItem onTouchTap={this.handleHomeClose}>Home</MenuItem>
            <MenuItem onTouchTap={this.handleThingClose}>Things</MenuItem>
            <MenuItem onTouchTap={this.handleMetricClose}>Metrics</MenuItem>
          </Drawer>
      </div>
    );
  }
})

module.exports = Navigation;
