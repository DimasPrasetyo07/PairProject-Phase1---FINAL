const {User} = require("../models")

class ContHome {
    static home(req, res) {
        // res.render('home')
        let UserId = req.session.UserId
        User.findByPk(UserId)
        .then((result) => {
            res.render('home', {result})
        }).catch((err) => {
            res.send(err)
        });
        // console.log(req.session.UserId)
    }
}

module.exports = ContHome