const mongoose = require('mongoose')


const couponSchema = new mongoose.Schema({
    coupon_code: {type:String, unique:true},
    coupon_type: {type:String, enum:["First", "Upto", "Flat", "Buy_1_Get_1_Free"]},
    coupon_expiry_date: {type:Date},
    coupon_status: {type:String, enum:["Active", "Inactive", "Blocked"]},
    coupon_usage_limit: {type:Number},
    coupon_apply_upto: {type:Number}

}, {timestamps:true})

module.exports = mongoose.model('coupon', couponSchema)