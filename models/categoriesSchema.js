const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    category_name: {type:String, required:true},
    category_type: {type:String}
 

}, {timestamps:true})

module.exports = mongoose.model('category', categorySchema)