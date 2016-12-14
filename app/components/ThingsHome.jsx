var  React=require('react');
import ReactDOM from 'react-dom';
import axios from 'axios';
import ThingsTable from 'ThingsTable';

var ThingsHome = React.createClass({

getInitialState:function(){
   return { ThingsArray:[] };
},
  componentWillMount:function(){
  var self=this;
  axios.get('/api/getThings').then(function(response){
    console.log('Loaded Things from Datonis!');
    console.log(response.data.things);
    self.setState({ThingsArray: response.data.things});
    console.log(self.state.ThingsArray);
  }, function(err){
    console.log(err);
  });
  },
  render: function(){
    return (
        <ThingsTable things={this.state.ThingsArray} />
      );
  }
});

module.exports = ThingsHome;
