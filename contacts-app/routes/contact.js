var Contact =require('../models/contact');
module.exports = function(app) {

    app.post('/add', function (req, res) {
        var newContact = new Contact({
            name: req.body.name,
            phone: req.body.phone
        });
        newContact.save(function (err) {
            if (err)return;
        });
    });
    app.get('/', function (req, res) {
        Contact.find(function (err) {
            if (err)
                return;
        });
    });
    app.delete('/delete/:id', function (req, res) {
        var id = req.params.id;
       Contact.remove({_id: id}, function (err) {
            if (err)
                return
        });
    });
    app.get('/contact/:id', function (req, res) {
        var id = req.params.id;
        Contact.findOne({_id: id}, function (err) {
            if(err)
                return;
        });
    });
    app.put('/editcontact/:id', function (req, res) {
        var query = { _id: req.params.id };
        Contact.update(query, { name: req.body.name , phone: req.body.phone }, function(err){
            if(err )
                return;
        });
    });
};