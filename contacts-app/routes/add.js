var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);

module.exports = function(app) {
    db.contacts.ensureIndex({'phone':1},{unique:true});
    app.post('/add', function (req, res) {
        db.contacts.insert(req.body, function (err, doc) {
            if(err || !doc)
            {
                res.send("Error phone number should be unique");
            }
            else
            {
                res.json(doc);
            }
        });
    });
}