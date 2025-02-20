const express = require('express')
const User = require('../models/userSchema')

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

const addPaymentMethod = (req,res) => {
    
}

const removePaymentMethod = (req,res) => {
    
}

const addRatingsonOrderedProduct = (req,res) => {
    
}

const addReviewonOrderedProduct = (req,res) => {
    
}



const getProfile = (req,res) => {
    
}

module.exports = {register,login,updateUser,deleteUser,
    addDeliveryAddress,addToCart,addToWishlist,addPaymentMethod,
    addRatingsonOrderedProduct,addReviewonOrderedProduct,getProfile,
    removeDeliveryAddress,deleteFromCart,emptyCart,removeFromWishlist,
    emptyWishlist,removePaymentMethod}

