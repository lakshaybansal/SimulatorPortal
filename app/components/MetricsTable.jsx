import React from 'react';
import Home from 'Home';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var MetricsTable = React.createClass({
  render: function () {
    var metricArray = this.props.metrics;
    return (
      <div>
        <h1>Metrics: </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>S.No</TableHeaderColumn>
              <TableHeaderColumn>Metric Key</TableHeaderColumn>
              <TableHeaderColumn>Metric Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metricArray.map(function(metrics, i) {
              return (
                <TableRow key={metrics.metric_key}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn>{metrics.metric_key}</TableRowColumn>
                  <TableRowColumn>{metrics.name}</TableRowColumn>
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



module.exports = MetricsTable;
