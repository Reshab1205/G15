const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    product_id: {type:mongoose.Schema.Types.ObjectId, ref:'products'},
    seller_id: {type:mongoose.Schema.Types.ObjectId, ref:"sellers"},
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
    order_status: {type:String, enum:["Order_Placed", "Shipped", "InTransit", "Arrived","Out_For_Delivery", "Delivered", "Order_Canceled_by_user", "Order_Canceled_by_seller", "Order_Returned_by_user"]},
    order_amount: {type:Number, required:true},
    order_delivery_date: {type:Date},
    order_deliver_address:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    order_tracking_id:{type:mongoose.Schema.Types.ObjectId, ref:'deliverys'}


}, {timestamps:true})

module.exports = mongoose.model('order', orderSchema)