const express = require('express')
const ContUser = require('../controller/contUser')
const router = express.Router()

router.get('/register', ContUser.registerForm)
router.post('/register', ContUser.postRegister)

router.get('/login', ContUser.loginForm)
router.post('/login', ContUser.postLogin)

module.exports = router