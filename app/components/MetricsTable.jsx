import React from 'react';
import axios from 'axios';
import MetricsHome from 'MetricsHome';

import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import TimePicker from 'material-ui/TimePicker';
import InputRange from 'react-input-range';

//var i=0;
var MetricsTable = React.createClass({
  getInitialState: function () {
    return {
    fields: {},
    defaultSlider: {
      min: 10,
      max: 200
    }
    }
  },
  handleSliderValues:function(event, value,metricName){
    console.log("Slide: ",value);
    var fields = this.state.fields;
    if(fields[metricName] == undefined) {
      fields[metricName] = {};
    }
    else {
      fields[metricName].min = value.min;
      fields[metricName].max = value.max;
      this.setState({fields: fields});
    }
  },
  handleTimePicker:function(event,value,metricName){
    var fields = this.state.fields;
    fields[metricName] = value;
    this.setState({fields: fields});
    console.log(this.state.fields);
  },
  handleBooleanValues: function (event, index, value, metricName) {
    var fields = this.state.fields;
    fields[metricName] = value;
    this.setState({fields: fields});
    console.log(this.state.fields);
  },
  handleTextValues: function (event, metricName, dataType) {
    var fields = this.state.fields;
    if(dataType == 1) {
      fields[metricName] = event.target.value;
    }
    else {
      fields[metricName] = parseInt(event.target.value);
    }
    this.setState({fields: fields});
    console.log(this.state.fields);
  },
  handleButtonSubmit: function (e) {
    e.preventDefault();
    var data = {
      fields: this.state.fields
    }

    axios.post('/api/postChanges', data).then(function (response){
      console.log('Saved metrics file successfully!');
    }, function (error) {
      console.log(error);
    });
  },
  componentWillMount:function(){
    var fieldsInitial;
    var self = this;
    axios.get('/api/getMetricValues').then(function (response){
      if(response.data != '')
      {
        fieldsInitial=response.data;
        self.setState({fields:fieldsInitial});
      }
      console.log('Loaded metrics file successfully!');
    }, function (error) {
      console.log(error);
    });
  },
  render: function () {
    var self=this;
    var metricArray = this.props.metrics;
    var valueField = function(metric) {
        var dataType=metric.data_type;
        var metricName=metric.name;

        if(dataType == 0)
        {
          return <InputRange className="InputRange-slider" defaultValue={self.state.defaultSlider}
                              maxValue={200}
                              minValue={10}
                              step={2}
                              value={self.state.fields[metricName]}
                              onChange={function(event, value) {self.handleSliderValues(event, value,metricName)}}
                            />;
        }
        else if(dataType == 1) {
          console.log(self.state.fields[metricName]);
          return <TimePicker key={metricName} hintText="12hr Format with auto ok"
            autoOk={true}  value={new Date(self.state.fields[metricName])}
          onChange={function(event, value) {self.handleTimePicker(event, value,metricName)}} />
          // return <TextField key={metricName} hintText="Enter value" value={self.state.fields[metricName] || ''}
          // onChange={function(e) {self.handleTextValues(e, metricName, dataType); } } />;
        }
        else if(dataType == 2)
        {
          // Set default false values for all SelectFields
          // var fields = self.state.fields;
          // if(fields[metricName] === undefined) {
          //   fields[metricName] = false;
          // }

           return (
            <SelectField key={metricName} value={self.state.fields[metricName]}
            onChange={function(e, index, value) { self.handleBooleanValues(e, index, value, metricName); }}>
              <MenuItem value={false} primaryText="false" />
              <MenuItem value={true} primaryText="true" />
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
                <TableRow key={metric.name}>
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
