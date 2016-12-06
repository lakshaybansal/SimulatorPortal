var  React=require('react');
import ReactDOM from 'react-dom';
import axios from 'axios';

var d=[];
var Home = React.createClass({

getInitialState:function(){
   return { metricAll:[] };
},
  componentDidMount:function(){
  var _this=this;
  this.serverRequest=axios.get('/api/getMetrics').then(function(data){
    console.log('Success');
    console.log(data);
    _this.setState({metricAll:data.data.metrics});
  }, function(err){
    console.log(err);
  });
  },
  render: function(){
  return (
    <div>
        <h1>Home</h1>
        {this.state.metricAll}
        <h1>Metrics are</h1>
          {this.state.metricAll.map(function(metric) {
            return (
              <div key={metric.metric_key} >
                Metric is {metric.name}
              </div>
    );
  })}
  </div>
  )
  }
});

module.exports = Home;
