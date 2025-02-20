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



const adminSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String},
    email: {type:String, unique:true, required:true},
    password: {type:String, required:true},
    mobile_number: {type:Number,unique:true, required:true},
    address: [addressSchema],
    admin_active_status: {type:String, enum:["Active", "InActive", "Blocked"]},
    admin_type:{type:String, enum:["SuperAdmin", "Admin_L1", "Admin_L2"]},
    admin_approval_status:{type:String, enum:["Approved", "Denied", "Pending"], default:"Pending"},
    seller_payment_status:{type:String, enum:["Pending", "Paid", "Blocked", "Delayed"], default:"Pending"}

}, {timestamps:true})

module.exports = mongoose.model('admin', adminSchema)