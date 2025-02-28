const express = require('express');
const Seller = require('../models/sellerSchema'); // Assuming you have a sellerSchema
const Product = require('../models/productSchema'); // Assuming you have a productSchema

const register = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('inputData', Object.keys(inputData).length);
        if (Object.keys(inputData).length === 0) {
            return res.status(400).json({ message: 'Provide Details' });
        }
        
        const existingEmail = await Seller.findOne({ email: inputData.email });
        const existingMobile = await Seller.findOne({ mobile_number: inputData.mobile_number });

        if (existingEmail || existingMobile) {
            return res.status(400).json({ message: 'Account is already Registered with us! Kindly Login' });
        }
        
        const createSeller = await Seller.create(inputData);
        console.log('createSeller', createSeller);
        return res.status(201).json({ message: 'Seller Registered', data: createSeller });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('inputData', Object.keys(inputData).length);
        if (Object.keys(inputData).length === 0) {
            return res.status(400).json({ message: 'Provide Details' });
        }

        const existingSeller = await Seller.findOne({ email: inputData.email });
        if (!existingSeller) {
            return res.status(400).json({ message: 'Account is not Registered with us! Kindly Register' });
        }

        // Assuming you have a method to validate password
        const isPasswordValid = await existingSeller.validatePassword(inputData.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong Credentials' });
        }

        return res.status(200).json({ message: 'Login Successful', data: existingSeller });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addProduct = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('inputData', Object.keys(inputData).length);
        if (Object.keys(inputData).length === 0) {
            return res.status(400).json({ message: 'Provide Product Details' });
        }

        const createProduct = await Product.create(inputData);
        console.log('createProduct', createProduct);
        return res.status(201).json({ message: 'Product Added', data: createProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const inputData = req.body;
        const productId = req.params.id;

        const updatedProduct = await Product.findByIdAndUpdate(productId, inputData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product Not Found' });
        }

        return res.status(200).json({ message: 'Product Updated', data: updatedProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product Not Found' });
        }

        return res.status(200).json({ message: 'Product Deleted', data: deletedProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const viewOrders = async (req, res) => {
    try {
        // Assuming you have an Order model
        const orders = await Order.find({ sellerId: req.params.id }); // Adjust based on your schema
        return res.status(200).json({ message: 'Orders Retrieved', data: orders });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    viewOrders,
};