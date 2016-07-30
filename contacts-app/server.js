var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./routes/findall')(app);
require('./routes/editcontact')(app);
require('./routes/delete')(app);
require('./routes/add')(app);
require('./routes/findone')(app);

app.listen(3000);
console.log('listening on port 3000');