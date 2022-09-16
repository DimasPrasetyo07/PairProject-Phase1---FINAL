const express = require('express')
const ContProduct = require('../controller/contProduct')
const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    } 
})

const upload = multer({storage: storage })


router.get('/add', ContProduct.addProduct)
router.post('/add', upload.single('imgSrc'), ContProduct.handlerAddProduct)
router.get('/:id/delete', ContProduct.deleteProduct)


module.exports = router