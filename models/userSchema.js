const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    address_line1:{type: String},
    address_line2:{type: String},
    street_locality:{type: String},
    landmark:{type: String},
    city:{type: String},
    state:{type: String},
    nation:{type: String, default: 'India'},
    pincode:{type:Number}

}, {timestamps:true})

const paymentSchema = new mongoose.Schema({
    mode_of_payment:{type: String, enum:["UPI", "Credit_Card", "Debit_Card", "NETBANKING", "CASH", "COUPONS"]},
    card_details:{
        Card_number:{type:Number},
        CVV:{type:Number},
        Expiry:{type:String},
        Name_on_card: {type:String}
    }

}, {timestamps:true})

const userSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String},
    email: {type:String, unique:true, required:true},
    password: {type:String, required:true},
    mobile_number: {type:Number,unique:true, required:true},
    address: [addressSchema],
    profile_image:{type:String},
    user_type:{type:String, enum:["Normal", "Gold", "Premium"]},
    payment: [paymentSchema],
    user_active_status: {type:String, enum:["Active", "InActive", "Blocked"]},

}, {timestamps:true})

module.exports = mongoose.model('user', userSchema)