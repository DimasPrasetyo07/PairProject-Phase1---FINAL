const convertToRupiah = require('../helper/convertRupiah');
const { Product, Profile, User, Transaction } = require('../models');
// const session = require('express-session')

class ContProduct {
  static addProduct(request, response) {
    let errors = request.query.errors
    response.render('formAddProduct', {errors});
  }

  static handlerAddProduct(request, response) {
    // console.log(request.body)
    let {filename} = request.file
    // if(filename === undefined) {
    //   throw('You need to upload photo of your product')
    // }
    let { name, description, price, stock } = request.body;
    Product.create({
      name,
      description,
      'imgSrc' : filename,
      price,
      stock
    })
      .then((result) => {
        response.redirect('/user/product');
      })
      .catch((err) => {
        // response.redirect(`/recipes/add?errors=${err}`)
        if (err.name === 'SequelizeValidationError') {
          let error = err.errors.map((el) => {
            return el.message;
          });
          // response.render('addProduct', {errors})
          response.redirect(`/product/add?errors=${error}`); //(`/product/add?errors=${err}`)  //
        } else {
          response.send(err);
        }
      });
  }

  static deleteProduct(request, response) {
    let { id } = request.params;
    Product.destroy({
      where: {
        id: id,
      },
    })
    .then((result) => {
      response.redirect('/user/product');
    }).catch((err) => {
      response.send(err);
    });
  }


}

module.exports = ContProduct;
