var Contact =require('../models/contact');
module.exports = function(app) {

    app.post('/add', function (req, res) {
        var newContact = new Contact({
            name: req.body.name,
            phone: req.body.phone
        });
        newContact.save(function (err) {
            if (err){
                res.statusCode(500).send("this contact already exists phone should be unique ");
                return;
            }
            res.send("added successfully");
        });
    });
    app.get('/', function (req, res) {
        Contact.find(function (err,docs) {
            if (err)
            {
                res.statusCode(500).send('error');
            }
                res.send(docs);

        });
    });
    app.delete('/delete/:id', function (req, res) {
        var id = req.params.id;
       Contact.remove({_id: id}, function (err) {
            if (err)
            {
                res.statusCode(500).send("contact not found")
            }
               res.send("deleted successfully")
        });
    });
    app.get('/contact/:id', function (req, res) {
        var id = req.params.id;
        Contact.findOne({_id: id}, function (err,doc) {
            if(err){
                res.statusCode(500).send("not found");
            }
                res.send(doc);
        });
    });
    app.put('/editcontact/:id', function (req, res) {
        var query = { _id: req.params.id };
        Contact.update(query, { name: req.body.name , phone: req.body.phone }, function(err){
            if(err )
            {
                res.statusCode(500).send("this phone number already exists , phone should be unique");
            }

                res.send("updated successfully")
        });
    });
};