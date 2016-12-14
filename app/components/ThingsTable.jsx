import React from 'react';
import axios from 'axios';
//import MetricsHome from 'MetricsHome';

import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//var i=0;
var ThingsTable = React.createClass({
  getInitialState: function () {
    return {
      fields: {}
    }
  },
  render: function () {
    var self=this;
    var ThingsArray = this.props.things;
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="List of All Things" style={{textAlign: 'center'}}>
                <h2>List of All Things</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h4>SNo</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Thing Key</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Thing Name</h4></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {ThingsArray.map(function(thing, i) {
              return (
                <TableRow key={thing.name}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn>{thing.thing_key}</TableRowColumn>
                  <TableRowColumn>{thing.name}</TableRowColumn>
                </TableRow>
              )
            }
          )}
          </TableBody>
        </Table>
      </div>
    );
  }
})

module.exports = ThingsTable;
