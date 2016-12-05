var express = require('express');
var router = express.Router();
var axios = require('axios');

var authToken;

router.post('/getAuth', function(req, res){
  var email=req.body.email;
  var password=req.body.password;

  var authOptions = {
      method: 'POST',
      url: 'https://api.datonis.io/api_sign_in',
      data: {
        'email': email,
        'password': password
      },
      headers: {
        'Content-Type' : 'application/json'
      },
      json: true
  };

  axios(authOptions).then(function(response){
    authToken = response.data.auth_token;
    res.send(response.data.auth_token);
  }, function(err){
    console.log(req.body, email, password);
    res.send(err);
  })
});

router.get('/getThings', function(req, res){

  var authOptions = {
      method: 'GET',
      url: 'https://api.datonis.io/api/v3/things',
      headers: {
        'Content-Type' : 'application/json',
        'X-Auth-Token': 'vlpjTuFfyFrawoa4rmGffA'
      },
      json: true
  };

  axios(authOptions).then(function(response){
    res.send(response.data);
  }, function(err){
    console.log(err);
    res.send(err);
  })
})

module.exports = router;
