var  React=require('react');
import ReactDOM from 'react-dom';
import axios from 'axios';
import MetricsTable from 'MetricsTable';

var d=[];
var Home = React.createClass({

getInitialState:function(){
   return { metricArray:[] };
},
  componentDidMount:function(){
  var self=this;
  axios.get('/api/getMetrics').then(function(data){
    console.log('Success');
    console.log(data);
    self.setState({metricArray:data.data.metrics});
  }, function(err){
    console.log(err);
  });
  },
  render: function(){
  return (
    <MetricsTable metrics={this.state.metricArray} />

  )
  }
});

module.exports = Home;
