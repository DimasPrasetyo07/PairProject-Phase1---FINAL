const express = require('express')
const ContHome = require('../controller/contHome')
const router = express.Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const loginRegister = require('./login-register');

router.use('/user', loginRegister)

router.use(function(req, res, next){
    if(!req.session.UserId){
        const error = "Please login first!"
        res.redirect(`/user/login?error=${error}`)
    } else {
        next()
    }
  })


router.get('/', ContHome.home)

router.use('/user', userRoutes)

router.use(function(req, res, next){
    if(req.session.UserId && req.session.role !== "Admin"){
        const error = "You Have No Access"
        res.redirect(`/user/login?error=${error}`)
    } else {
        next()
    }
  })
    
router.use('/product', productRoutes)



module.exports = router