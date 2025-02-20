const mongoose = require('mongoose')


const deliverySchema = new mongoose.Schema({
    delivery_id: {type:String, unique:true, required:true},
    delivery_partner: {type:String, required:true},
    delivery_placed_date: {type:mongoose.Schema.Types.ObjectId, ref:'orders'},
    delivery_delivered_date: {type:Date},
    delivery_person: {type:String},
    delivery_person_number: {type:Number},
    delivery_person_ratings: {type:String},
    delivery_person_feedback: {type:String},
    delivery_status: {type:String, enum:["Cancel", "Return", "Exchange", "Delivered"]},



}, {timestamps:true})

module.exports = mongoose.model('delivery', deliverySchema)