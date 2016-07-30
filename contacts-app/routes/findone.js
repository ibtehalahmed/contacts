var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);

module.exports = function(app) {
    app.get('/contact/:id', function (req, res) {
        var id = req.params.id;
        db.contacts.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
            if(err || !doc)
            {
                res.send('not found');
            }
            else
            {
                res.json(doc);
            }
        });
    });
}