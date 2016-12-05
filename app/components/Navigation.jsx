import React from 'react';
import AppBar from 'material-ui/AppBar';

var Navigation = React.createClass({
  render: function(){
    return (
      <div>
          <AppBar title="Datonis Portal" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
      </div>
    );
  }
})

module.exports = Navigation;
