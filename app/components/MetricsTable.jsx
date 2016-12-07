import React from 'react';
import Home from 'Home';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

var MetricsTable = React.createClass({
  ValueField:function(){
    var metricArray=this.props.metrics;
    metricArray.map(function(metrics, i) {

      var t=metrics.data_type;
      console.log(t);
      if(t==0)
      {
        return(<TextField hintText="Hint Text"
            defaultValue="Default Value" />);
      }
      if(t==2)
      {
         return(<SelectField floatingLabelText="Ready?" value="Yes">
          <MenuItem value={null} primaryText="" />
          <MenuItem value={false} primaryText="No" />
          <MenuItem value={true} primaryText="Yes" />
        </SelectField>);
      }
    })
  },
  render: function (props) {
    var p=this;
    var newValueField = function(metric) {
        var t=metric.data_type;
        console.log(t);
        if(t==0)
        {
          console.log("In 0");
          return(<TextField hintText="Hint Text"
              defaultValue="Default Value" />);
        }
        if(t==2)
        {
           return(<SelectField floatingLabelText="Ready?" value="Yes">
            <MenuItem value={null} primaryText="" />
            <MenuItem value={false} primaryText="No" />
            <MenuItem value={true} primaryText="Yes" />
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
