var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req,res) {
 //res.send('hello');
  db.contacts.find(function(err,docs){
  	res.json(docs);
  	//res.send('hello');
  });
});


app.post('/add',function(req,res){
	console.log(req.body);
	db.contacts.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

app.delete('/delete/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contacts.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});


app.get('/contact/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/edit-contact/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contacts.findAndModify({
	query: {_id: mongojs.ObjectId(id)},
	update: {$set: {name: req.body.name, phone: req.body.phone}},
	new: true}, function (err, doc) {
		res.json(doc);
		});
});



app.listen(3000);
console.log('listening on port 3000');