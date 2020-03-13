const { User } = require(`../models`)
const { deHash } = require(`../helpers/bcrypt`)
const { createToken } = require(`../helpers/token`)
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.G_CLIENT_ID);

class UserController {

    static register (req, res, next) {
        console.log(req.body.email)
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

    static gSign (req, res, next) {
        let gToken = req.body.data.access_token
        let payload = null
        client.verifyIdToken({
            idToken:gToken,
            audience: process.env.G_CLIENT_ID
        })
        .then(data => {
            payload = data.getPayload()
            return User.findOne({where:{email:payload.email}})
        })
        .then(data => {
            let createUser = {
                name: payload.name,
                email: payload.email,
                password: `hanyatuhandandiayangtau`
            }

            if (data == null) {
                return User.create(createUser)
            } else {
                let gotToken = createToken({
                    id: data.id,
                    name: payload.name,
                    email: payload.email
                })

                req.headers = gotToken,
                req.userData = {
                    id: createUser.id,
                    name: createUser.name,
                    email: createUser.email
                }
                res.status(200).json({access_token : gotToken})
            }
        })
        .then(data => {
            let user = {
                id: data.id,
                name: data.name,
                email: data.email
            }
            let token = createToken(user)
            res.status(200).json({access_token:token})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = UserController