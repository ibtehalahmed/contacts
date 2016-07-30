var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);

module.exports = function(app) {
    app.delete('/delete/:id', function (req, res) {
        var id = req.params.id;
        db.contacts.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
            if(err || !doc)
            {
                res.send("not found");
            }
            else
            {
                res.send("deleted successfully");
            }
        });
    });
}