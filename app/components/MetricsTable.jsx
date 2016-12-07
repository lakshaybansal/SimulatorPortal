import React from 'react';
import Home from 'Home';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

var MetricsTable = React.createClass({
  getInitialState: function () {
    return {
      value: {}
    }
  },
  handleBooleanValues: function (metric_key,event,index,value2) {
    // e.preventDefault();
    console.log(metric_key);
    console.log(value2);
    this.state.value[metric_key] = value2;
    console.log(this.state.value);
    this.setState({value:this.state.value});
  },
  render: function (props) {
    var p=this;
    var newValueField = function(metric) {
        var t=metric.data_type;
        var c=metric.metric_key;
        // console.log(t);
        if(t==0)
        {
          // console.log("In 0");
          return(<TextField key={c} hintText="Enter value" />);
        }
        if(t==2)
        {
           return(<SelectField key={c} floatingLabelText="Boolean" value={p.state.value[c]} onChange={p.handleBooleanValues.bind(p,c)}>
            <MenuItem value={false} primaryText="false" />
            <MenuItem value={true} primaryText="true" />
          </SelectField>);
        }
      }
    var metricArray = this.props.metrics;

    return (
      <div>
        <h1>Metrics: </h1>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>S.No</TableHeaderColumn>
              <TableHeaderColumn>Metric Key</TableHeaderColumn>
              <TableHeaderColumn>Metric Name</TableHeaderColumn>
              <TableHeaderColumn>Metric Value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody  displayRowCheckbox={false}>
            {metricArray.map(function(metric, i) {
              return (
                <TableRow key={metric.metric_key}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn>{metric.metric_key}</TableRowColumn>
                  <TableRowColumn>{metric.name}</TableRowColumn>
                  <TableRowColumn>
                    {newValueField(metric)}
                  </TableRowColumn>
                </TableRow>
              )
          }
          )}
          </TableBody>
        </Table>
        <RaisedButton type="submit" label="Submit" primary={true} style={{
            margin: '5px 0px 0px 400px'
        }} />
      </div>
    );
  }
})



module.exports = MetricsTable;
