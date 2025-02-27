const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()


router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add-address/:id', userController.addDeliveryAddress)
router.post('/add-card/:id', userController.addPaymentMethod)

// router.post('/register', userController.register)
// router.post('/register', userController.register)
// router.post('/register', userController.register)

module.exports = router 
