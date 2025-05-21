const User = require('../models/userSchema')
const order = require('../models/orderSchema')
const { default: mongoose } = require('mongoose')


const myOrders = (userId) => {
    const MyOrders = order.aggregate([
        {
            $match: {user_id: new mongoose.Types.ObjectId.isValid(userId)}
        },
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product_details"
            }
        }
    ])
}