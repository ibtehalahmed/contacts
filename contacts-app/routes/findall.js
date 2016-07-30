var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);

module.exports = function(app){
    app.get('/', function (req,res) {
        db.contacts.find(function(err,docs){
            if(err || !docs)
            {
                res.send("not found");
            }
            else
            {
                res.json(docs);
            }
        });
    });
}
