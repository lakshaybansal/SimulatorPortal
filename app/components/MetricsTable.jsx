import React from 'react';
import Home from 'Home';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//var i=0;
var MetricsTable = React.createClass({
  getInitialState: function () {
    return {
      value: {}
    }
  },
  handleBooleanValues: function (event,index,value2,metricKey) {
    console.log("event:",event);
    console.log("index:",index);
    console.log("value:",value2);
    console.log('metric_key',metricKey);
     var tempObj = this.state.value;
     tempObj[metricKey] = value2;
     this.setState({value : tempObj});
  },
  handleTextValues: function (event,metricKey) {
    console.log("event:",event);
    console.log('metric_key',metricKey);
    console.log("value",event.target.value);
     var tempObj = this.state.value;
     tempObj[metricKey] = event.target.value;
     this.setState({value : tempObj});
  },
 //  ComponentWillMount:function(){
 //   MetricArray=this.props.metrics;
 //   var self=this;
 //   MetricArray.map(function(metric){
 //     self.setState({userInput[metric.metric_key]:metric.value})
 //   })
 // },
  render: function (props) {
    var p=this;
    var newValueField = function(metric) {
      var t=metric.data_type;
      var c=metric.metric_key;
        if(t==0)
        {
          //console.log("In 0");
          return(<TextField hintText="Hint Text"  value={p.state.value[c]} onChange={function(e){
            p.handleTextValues(e,c);
          }} />);
        }
        if(t==2)
        {
           return(<SelectField key={c} floatingLabelText="Boolean" value={p.state.value[c]}  onChange={function(e,index,value){
             p.handleBooleanValues(e,index,value,c);
           }}>
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
