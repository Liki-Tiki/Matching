const express = require('express')
const router = express.Router()

const AuthenticationController = require('../controllers/AuthenticationController')
const UserController = require('../controllers/UserController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const AdminPolicy = require('../policies/AdminPolicy')
const isAuthenticated = require('../policies/IsAuthenticated')

router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

router.post('/login',
    AuthenticationController.login)

router.put('/update',
    isAuthenticated,
    AuthenticationController.update)

router.delete('/delete',
    isAuthenticated,
    AuthenticationController.delete)

router.get('/confirmation/:token',
    AuthenticationController.confirmEmail)

router.get('',
    AdminPolicy.isAdmin,
    UserController.getAll)

router.get('/:id',
    AdminPolicy.canManageUser,
    UserController.get)

router.put('/:id',
    AdminPolicy.canManageUser,
    UserController.update)

router.delete('/:id',
    AdminPolicy.canManageUser,
    UserController.delete)

module.exports = router