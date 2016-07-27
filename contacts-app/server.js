var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);



app.use(express.static(__dirname+"/public"));

app.get('/', function (req, res) {
 //res.send('hello');
  db.contacts.find(function(err,docs){
  	res.json(docs);
  	//res.send('hello');
  })
});

app.listen(3000)
console.log('listening on port 3000');