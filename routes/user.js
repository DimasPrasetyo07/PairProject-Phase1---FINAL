const express = require('express')
const ContUser = require('../controller/contUser')
const router = express.Router()

router.get('/logout', ContUser.getLogout)
router.get('/product/:id/detail', ContUser.productDetail)
router.get('/:id/buy', ContUser.buyProduct)
router.get('/product', ContUser.productList)
router.get('/user-list', ContUser.readUser)

module.exports = router