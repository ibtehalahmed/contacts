var mongojs = require('mongojs');
var db=mongojs('contacts',['contacts']);

module.exports = function(app) {
    app.put('/editcontact/:id', function (req, res) {
        var id = req.params.id;
        db.contacts.findAndModify({
            query: {_id: mongojs.ObjectId(id)},//selects the id that will be modified
            update: {$set: {name: req.body.name, phone: req.body.phone}},
            new: true
        }, function (err, doc) {
            if(err || !doc)
            {
                res.send('There is already a contact with this phone number , phone number should be unique');
            }
            else
            {
                res.send("modified successfully")
            }
        });
    });
}