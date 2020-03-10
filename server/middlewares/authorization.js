const { Task } = require(`../models`)

module.exports = (req, res, next) => {
    Task.findOne({where:{id:req.params.id, user_id:req.userData.id}})
    .then(data => {
        if (data) {
            next()
        } else {
            next({
                status:401,
                msg:`Not authorized`
            })
        }
    })
    .catch(err => {
        next(err)
    })
}