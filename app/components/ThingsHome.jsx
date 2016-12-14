var  React=require('react');
import ReactDOM from 'react-dom';
import axios from 'axios';
import ThingsTable from 'ThingsTable';

var ThingsHome = React.createClass({

getInitialState:function(){
   return { ThingsArray:[],LoggedIn:true };
},
  componentWillMount:function(){
  var self=this;
  axios.get('/api/getThings').then(function(response){
    console.log('Loaded Things from Datonis!');
    console.log(response.data.things);
    self.setState({ThingsArray: response.data.things,LoggedIn:true});
    console.log(self.state.ThingsArray);
  }, function(err){
     self.setState({LoggedIn:false});
    console.log(err);
  });
  },
  render: function(){
    var self=this;
    var CheckLoggedIn=function(){
      if(self.state.LoggedIn==false)
         {
           return (<h1>You have not Logged in</h1>);
         }
         else
         {
           return(<ThingsTable things={self.state.ThingsArray} />);
         }
    }
    return (
         <div>
         {CheckLoggedIn()}
        </div>
      );
  }
});

module.exports = ThingsHome;
