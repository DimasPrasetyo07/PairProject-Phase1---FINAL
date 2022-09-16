const {Product, Profile, User, Transaction} = require("../models")
const bcrypt = require('bcryptjs');
const convertToRupiah = require("../helper/convertRupiah");
const {Op} = require('sequelize')

class ContUser {

    static loginForm(req, res) {
        const { error } = req.query;
        res.render('login', { error });
      }
    
      static registerForm(req, res) {
        res.render('register');
      }

      static postRegister(req, res) {
        const { username, email, password, name, phone, nik } = req.body;
        // console.log(req.session.user, '<<<<<<<<')
        User.create({username, email, password})
          .then(result => {
            console.log(result)
            return Profile.create({UserId: result.id, name, phone, nik})
          })
          .then((newUser) => {
            res.redirect('/');
          })
          .catch((err) => {
            res.send(err);
          });
      }
    
      static postLogin(req, res) {
        //! find one dari Username
        const { username, password } = req.body;
        User.findOne({
          where: { username },
        })
          .then((user) => {
            if (user) {
              const isValidPassword = bcrypt.compareSync(password, user.password); //! true / false
              if (isValidPassword) {
                req.session.UserId = user.id;
                req.session.role = user.role
                return res.redirect('/');
              } else {
                const error = 'Invalid Password';
                return res.redirect(`/user/login?error=${error}`);
              }
            } else {
              const error = 'Invalid Username';
              return res.redirect(`/user/login?error=${error}`);
            }
          })
          .catch((err) => {
            res.send(err);
          });
      }
    
      static getLogout(req, res){
        req.session.destroy((err) => {
            if(err){
                res.send(err)
            } else {
                res.redirect('/user/login')
            }
        })
      }

    static readUser(req, res) {
        // res.send('tes tes userlist')
        User.findAll({
            include: {
                model: Profile
            }
        })
        .then(result => {
            // res.send(result)
            // console.log(result)
            res.render('userList', {result})
        })
        .catch(err => {
          // console.log(err, '<<<<<<')  
          res.send(err)
        }) 
    }
    

    static productList (request, response) {
      // response.send('uji coba ruting yg dikirim dari controler')
      const {search} = request.query
      let option = {}
      if (search) {
          option.where = {
        name: {[Op.iLike]: `%${search}%`}
      }
      }
      Product.findAll(option)
      .then(result => {
        let role = request.session.role
          response.render('productList', {result, convertToRupiah, role})
          // response.send(result)
      })
      .catch(err => {
          response.send(err)
      })
  }

    static productDetail (request, response) {
      let {id} = request.params
      Product.findByPk(id)
      .then(result => {
        let role = request.session.role
        response.render('productDetail', {result, convertToRupiah, role})
      })
      .catch(err => {
          response.send(err)
      })
  }

  static buyProduct (request, response) {
    const {id} = request.params
    Product.decrement('stock', {where: {
      "id" : id
    }})
    .then(() => {
        let userId = request.session.UserId;
        return Transaction.create({UserId: userId, ProductId: id})
    })
    .then(result => {
        response.redirect(`/user/product/${id}/detail`)
    })
    .catch(err => {
        // console.log(err, '<<<<<<<<<<<<<')
        response.send(err)
    })
  }
}


module.exports = ContUser