const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()


router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add-address/:id', userController.addDeliveryAddress)
router.post('/add-card/:id', userController.addPaymentMethod)

router.get('/get-all-active-users',userController.getAllActiveUser)
router.get('/get-type-of-users',userController.groupUsersByType)
router.get('/get-city-of-users/:city',userController.getUsersByCity)

router.get('/get-active-users',userController.getActiveUsers)
router.get('/get-group-of-users',userController.getUserByGroup)

// router.post('/register', userController.register)
// router.post('/register', userController.register)
// router.post('/register', userController.register)

module.exports = router 
