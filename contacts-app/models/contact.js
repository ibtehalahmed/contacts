var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var contactSchema = new Schema({
    name: { type: String, required: true},
    phone: { type: String, required: true, unique: true}
});
module.exports=mongoose.model('Contact', contactSchema);