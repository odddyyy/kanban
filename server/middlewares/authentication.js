const { verifyToken } = require(`../helpers/token`)

module.exports = (req, res, next) => {
    try {
        if (!req.headers.access_token) {
            next({
                status:401,
                msg:`Token cannot be empty`
            })
        }
        req.userData = verifyToken(req.headers.access_token) 
        next()
    } catch (error) {
        next({
            status:400,
            msg:`Invalid Token`
        })
    }
}