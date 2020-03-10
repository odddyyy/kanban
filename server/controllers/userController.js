const { User } = require(`../models`)
const { deHash } = require(`../helpers/bcrypt`)
const { createToken } = require(`../helpers/token`)

class UserController {

    static register (req, res, next) {

        User.findOne({where:{email:req.body.email}})
        .then(data => {
            if (data) {
                // goes into errorhandler email already registerd
                next({
                    status: 409,
                    msg:`Email already registered`
                })
            } else {
                let newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
                return User.create(newUser)
            }
        })
        .then(data => {
            let tokenize = {
                id: data.id,
                name: data.name,
                email: data.email            
            }

            let token = createToken(tokenize)
            res.status(201).json({access_token : token})

        })
        .catch(err => {
            next(err)
        })
        
    }


    static login (req, res, next) {
        let userData = null
        User.findOne({where:{email: req.body.email}})
        .then(data => {
            if (data) {
                let hashed = data.password
                let password = req.body.password
                userData = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
                return deHash(password, hashed)
            } else {
                next({
                    status:400,
                    msg:`Invalid Email / Password`
                })
            }
        })
        .then(data => {
            if (data) {
                let token = createToken(userData)
                res.status(200).json({access_token:token})
            } else {
                next({
                    status:400,
                    msg:`Invalid Email / Password`
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController