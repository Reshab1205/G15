const mongoose = require('mongoose')

const productReviewSchema = new mongoose.Schema({
    ratings: {type:Number},
    feedback:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:'users'}

}, {timestamps:true} )



const productSchema = new mongoose.Schema({
    product_id: {type:String, required:true, unique:true},
    product_name: {type:String, required:true},
    seller_id: {type:mongoose.Schema.Types.ObjectId, ref:"sellers", required:true},
    product_price: {type:Number, required:true},
    product_max_discount: {type:Number},
    product_price_after_discount: {type:Number},
    product_type: {type:mongoose.Schema.Types.ObjectId, ref:"category"},
    product_expiry_date: {type:Date},
    product_batch_number: {type:Number},
    product_ISBN_number: {type:Number},
    product_manufactured_date: {type:Date},
    product_size:{type:String},
    product_description:{type:String},
    product_brand_name:{type:String},
    product_image:{type:[String]},
    product_size:{type:String},
    product_reviews:[productReviewSchema]



}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema)