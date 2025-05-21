const express = require('express')
const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const { default: mongoose } = require('mongoose')

const register = async (req,res) => {
    try {
        const inputData = req.body
        console.log('inputData', Object.keys(inputData).length)
        if(Object.keys(inputData).length === 0) {
            return res.status(402).json({message:'Provide Details'})
        }
        const existingEmail = await User.findOne({email: inputData.email})
        const existingMobile = await User.findOne({mobile_number: inputData.mobile_number})

        if(existingEmail || existingMobile) {
            return res.status(402).json({message:'Account is already Registered with us! Kindly Login'})
        }
        const createUser = await User.create(inputData)
        console.log('createUser',createUser)
        return res.status(200).json({message:'User Registered', data:createUser})
    } catch(err) {
        console.log(err)
        return res.status(402).json({message:'Internal Server Error'})
    }
}

const login = async (req,res) => {
    try {
        const inputData = req.body
        console.log('inputData', Object.keys(inputData).length)
        if(Object.keys(inputData).length === 0) {
            return res.status(402).json({message:'Provide Details'})
        }

        // const existingUser = await User.findOne({email: inputData.email})
        
        if(!match) {
            return res.status(402).json({message:'Account is not Registered with us! Kindly Register'})
        }

                    return res.status(200).json({message:'User Registered', data:match})

        // if(match.password === inputData.password) {
        //     const createUser = await User.create(inputData)
        //     return res.status(200).json({message:'User Registered', data:createUser})
        // } else {
        //     return res.status(402).json({message:'Wrong Credentials'})
        // }
    } catch(err) {
        return res.status(402).json({message:'Internal Server Error'})
    }
}

const getAllActiveUser = async (req,res) => {
    try {
        const users = await User.aggregate([
            {
                $match: { user_active_status: "Active"}
            },
            {
                $project: {
                    first_name:1,
                    last_name:1,
                    email:1,
                    mobile_number:1,
                    // address:1,
                    _id:0
                }
            }
        ])
        return res.status(200).json({message: "Active Users", data:users})

    } catch (err) {
        return res.status(402).json({message:'Internal Server Error'})   
    }
}

const groupUsersByType = async (req,res) => {
    try {
        const groupedData = await User.aggregate([
            {
                $group: {
                    _id:"$user_type",
                    count: {$sum: 1}
                }
            },
            {
                $sort: { count: -1}
            }
        ])
        return res.status(200).json({message: "Type of Users", data:groupedData})
    } catch (err) {
        return res.status(402).json({message:'Internal Server Error'})   
    }
}

const getUsersByCity = async (req,res) => {
    try {
        const { city } = req.params;

        const users = await User.aggregate([
            { $unwind : "$address" },
            { $match : { "address.city": city }},
            {
                $project: {
                    first_name: 1,
                    last_name: 1,
                    email: 1,
                    mobile_number: 1,
                    "address.city": 1
                }
            },
        ])
        return res.status(200).json({message: "City of Users", data:users}) 
    } catch (err) {
        return res.status(402).json({message:'Internal Server Error'})   
    }
}

const getAllOrdersDetailsOfUser = async (req,res) => {
    try {
        const { userId} = req.params;
        const orders = await Order.aggregate([
            {$match: {user_id: new mongoose.Types.ObjectId.isValid(userId)}},
            { 
                $lookup: {
                    from: "products",
                    localField:"product_id",
                    foreignField:"_id",
                    as: "product_details"
                }
            },
            {
                $lookup: {
                    from: "seller",
                    localField: "seller_id",
                    foreignField: "_id",
                    as: "seller_details"
                }
            },
            { $unwind: "$product_details"},
            { $unwind: "$seller_details"},
            {
                $project: {
                    order_status:1,
                    order_amount:1,
                    "product_details.product_name":1,
                    "seller_details.name":1,
                    createdAt:1
                }
            }
        ])
        return res.status(200).json({message: "Order Detail of User", data:orders}) 

    } catch (err) {
        return res.status(402).json({message:'Internal Server Error'})    
    }
}

const updateUser = (req,res) => {
    
}

const deleteUser = (req,res) => {

}

const addDeliveryAddress = async (req,res) => {
    try {
        const inputData = req.body
        console.log('inputData', Object.keys(inputData).length)
        if(Object.keys(inputData).length === 0) {
            return res.status(402).json({message:'Provide Details'})
        }

        const createDeliveryAddress = await User.findByIdAndUpdate(req.params.id, {
            address:inputData
        })
        console.log('createDeliveryAddress',createDeliveryAddress)
        return res.status(200).json({message:'Address Added', data:createDeliveryAddress})
    } catch(err) {
        console.log(err)
        return res.status(402).json({message:'Internal Server Error'})
    }    
}
const removeDeliveryAddress = (req,res) => {
    
}

const addToCart = (req,res) => {
    
}

const deleteFromCart = (req,res) => {
    
}

const emptyCart = (req,res) => {
    
}

const addToWishlist = (req,res) => {
    
}

const removeFromWishlist = (req,res) => {
    
}

const emptyWishlist = (req,res) => {
    
}

// const addPaymentMethod = async (req,res) => {
//     try {
//         const { id } = req.params
//         const inputData = req.body
//         if(!id || Object.keys(inputData).length === 0) {
//             return res.status(402).json({message:'Provide Details'})
//         }
//         const validPaymentModes = ["UPI", "Credit_Card", "Debit_Card", "NETBANKING", "CASH", "COUPONS"]
//         if(!validPaymentModes.includes(inputData.mode_of_payment)) {
//             return res.status(402).json({message:'Invalid Mode of Payment'})
//         }
//         if(["Credit_Card", "Debit_Card"].includes(inputData.mode_of_payment)) {
//             if(!inputData.card_details) {
//                 return res.status(402).json({message:'Please Provide Card Details'})
//             }     
//         }
//         const user = await User.findById(id)
//             if(!user) {
//                 return res.status(402).json({message:'User does not exists'})
//             }
//             const matchCard = user.payment.find(payment => payment.card_details.Card_number === inputData.card_details.Card_number)
//             if(matchCard) {
//                 return res.status(402).json({message:'Card Already exists'})
//             }
//             const findUserAndAddPayment = await User.findByIdAndUpdate(req.params.id, {
//                 $push: {payment:inputData}
//             })
//             findUserAndAddPayment['payment'].push(inputData)
//             console.log('findUserAndAddPayment',findUserAndAddPayment)
//             return res.status(200).json({message:'Payment Added', data:findUserAndAddPayment})

        
//     } catch(err) {
//         console.log(err)
//         return res.status(402).json({message:'Internal Server Error'})
//     }}

const addPaymentMethod = async (req,res) => {
     try{
    const { id } = req.params
    const inputData = req.body
    console.log(Object.keys(inputData))
    if(!id || Object.keys(inputData).length === 0) {
        return res.status(400).json({ message: 'Provide Details'})
    }

    const validPaymentModes = ["UPI", "Credit_Card", "Debit_Card", "NETBANKING", "CASH", "COUPONS"]
    if(!validPaymentModes.includes(inputData.mode_of_payment)) {
        return res.status(400).json({ message: 'Invalid Payment Mode'})
    }
    if(["Credit_Card", "Debit_Card"].includes(inputData.mode_of_payment)) {
        if(!inputData.card_details) {
            return res.status(400).json({ message: 'Invalid Card Details'})
        }
    }
    const user = await User.findById(id)
    const matchCard = user.payment.find(payment => payment.card_details.Card_number === inputData.card_details.Card_number)
    if(matchCard) {
        return res.status(400).json({ message: 'Card Already exists'})
    }
    const findUserAndAddPayment = await User.findByIdAndUpdate(id, {
        $push: {payment:inputData}
    })
    return res.status(400).json({ message: 'Card Added', data:findUserAndAddPayment})
} catch (err) {
    return res.status(400).json({ message: 'Internal Server Error'})
}

}

const removePaymentMethod = (req,res) => {
    
}

const addRatingsonOrderedProduct = (req,res) => {
    
}

const addReviewonOrderedProduct = (req,res) => {
    
}

const getActiveUsers = async (req,res) => {
    try{
        const activeUsers = await  User.aggregate([
            {
                $match: {user_active_status: "Active"}
            },
            {
                $project: {
                    email:1,
                    mobile_number:1,
                    first_name:1,
                    _id:0
                }
            }
        ])
        console.log(activeUsers)
        return res.status(202).json({message: "Active Users", data:activeUsers})

    } catch (err) {
        return res.status(402).json({message:'Internal Server Error'})
    }

}

const getInActiveUsers = async (req,res) => {
    try{
        const InActiveUsers = await  User.aggregate([
            {
                $match: {user_active_status: "InActive"}
            },
            {
                $project: {
                    email:1,
                    mobile_number:1,
                    first_name:1,
                    _id:0
                }
            }
        ])
        console.log(InActiveUsers)
        return res.status(202).json({message: "InActive Users", data:InActiveUsers})

    } catch (err) {
        return res.status(402).json({message:'Internal Server Error'})
    }
}

const getBlockedUsers = async (req,res) => {
    
}

const getUserByGroup = async (req,res) => {
    try {
        const groupedData = await User.aggregate([
            {
                $group: {
                    _id:"$user_type",
                    count: {$sum:1}
                }
            },
            {
                $sort: { count: -1}
            }
        ])
        return res.status(202).json({message: "Group of Users", data:groupedData})

    } catch (err) {
        return res.status(402).json({message:'Internal Server Error'})
    }

}




const getProfile = (req,res) => {
    
}

module.exports = {register,login,getActiveUsers,getUserByGroup,getInActiveUsers,getBlockedUsers,updateUser,deleteUser,getAllActiveUser,groupUsersByType,
    getUsersByCity, addDeliveryAddress,addToCart,addToWishlist,addPaymentMethod,
    addRatingsonOrderedProduct,addReviewonOrderedProduct,getProfile,
    removeDeliveryAddress,deleteFromCart,emptyCart,removeFromWishlist,
    emptyWishlist,removePaymentMethod}

