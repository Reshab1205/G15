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
    mode_of_payment:{type: String, enum:["UPI", "CREDIT_CARD", "DEBIT_CARD", "NETBANKING", "CASH"]},
    CREDIT_CARD:[{
        CARD_NUMBER:{type:Number},
        CVV:{type:Number},
        EXPIRY:{type:String},
        CARD_HOLDER_NAME: {type:String}
    }],
    DEBIT_CARD:[{
        CARD_NUMBER:{type:Number},
        CVV:{type:Number},
        EXPIRY:{type:String},
        CARD_HOLDER_NAME: {type:String}
    }]
    

}, {timestamps:true})

const sellerSchema = new mongoose.Schema({
    seller_id:{type:String, unique:true},
    first_name: {type:String, required:true},
    last_name: {type:String},
    email: {type:String, unique:true, required:true},
    password: {type:String, required:true},
    mobile_number: {type:Number,unique:true, required:true},
    address: [addressSchema],
    paymentMethods: [paymentSchema],
    order_status: {type:String, enum:["Order_Placed", "Shipped", "InTransit", "Arrived","Out_For_Delivery", "Delivered", "Order_Canceled_by_user", "Order_Canceled_by_seller", "Order_Returned_by_user"]},
    seller_active_status: {type:String, enum:["Active", "InActive", "Blocked"]},
    my_orders: {type:String, required:true},
    orders:[],
    gst_number:{ type:String, unique:true, required:true},
    vat_number:{ type:String, unique:true},
    aadhar_number:{type:Number, unique:true},
    pan_number:{type:String, unique:true},
    aadhar_verify_status:{type: String, enum:["Verified", "Pending", "Failed"], default:"Pending"},
    gst_verify_status:{type: String, enum:["Verified", "Pending", "Failed", "blocked"], default:"Pending"},
    pan_verify_status:{type: String, enum:["Verified", "Pending", "Failed"], default:"Pending"},
    payment_status:{type:String, enum:["Done", "Pending", "Blocked"], default: "Pending"}

}, {timestamps:true})

module.exports = mongoose.model('seller', sellerSchema)