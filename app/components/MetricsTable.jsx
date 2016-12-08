import React from 'react';
import axios from 'axios';
import Home from 'Home';

import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//var i=0;
var MetricsTable = React.createClass({
  getInitialState: function () {
    return {
      fields: {}
    }
  },
  handleBooleanValues: function (event, index, value, metricKey) {
    var fields = this.state.fields;
    fields[metricKey] = value;
    this.setState({fields: fields});
    console.log(this.state.fields);
  },
  handleTextValues: function (event, metricKey) {
    var fields = this.state.fields;
    fields[metricKey] = event.target.value;
    this.setState({fields: fields});
    console.log(this.state.fields);
  },
  handleButtonSubmit: function (e) {
    e.preventDefault();
    var data = {
      fields: this.state.fields
    }

    axios.post('/api/postChanges', data).then(function (response){
      console.log('Success', response);
    }, function (error) {
      console.log(error);
    })
  },
  render: function () {
    var self=this;
    var metricArray = this.props.metrics;
    var valueField = function(metric) {
        var dataType=metric.data_type;
        var metricKey=metric.metric_key;

        if(dataType == 0)
        {
          return <TextField key={metricKey} hintText="Enter value" value={self.state.fields[metricKey] || ''}
          onChange={function(e) {self.handleTextValues(e, metricKey); } } />;
        }
        if(dataType == 2)
        {
          // Set default false values for all SelectFields
          var fields = self.state.fields;
          if(fields[metricKey] === undefined) {
            fields[metricKey] = false;
          }

           return (
            <SelectField key={metricKey} value={self.state.fields[metricKey]}
            onChange={function(e, index, value) { self.handleBooleanValues(e, index, value, metricKey); }}>
              <MenuItem value={false} primaryText="No" />
              <MenuItem value={true} primaryText="Yes" />
            </SelectField>
          );
        }
      }

    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="List of All Metrics" style={{textAlign: 'center'}}>
                <h2>List of All Metrics</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h4>S.No</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Metric Key</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Metric Name</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Metric Value</h4></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {metricArray.map(function(metric, i) {
              return (
                <TableRow key={metric.metric_key}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn>{metric.metric_key}</TableRowColumn>
                  <TableRowColumn>{metric.name}</TableRowColumn>
                  <TableRowColumn>
                    {valueField(metric)}
                  </TableRowColumn>
                </TableRow>
              )
            }
          )}
          </TableBody>
          <TableFooter adjustForCheckbox={false} >
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                <RaisedButton type="submit" label="Submit" primary={true} onClick={this.handleButtonSubmit}
                  />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
    );
  }
})

module.exports = MetricsTable;
