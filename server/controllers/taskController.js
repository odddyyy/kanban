const { Task } = require(`../models`)

class TaskController {

    static show (req, res, next) {
        Task.findAll({where:{user_id : req.userData.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static add (req, res, next) {
        console.log(`masuk add`)
        let newTask = {
            title: req.body.title,
            description: req.body.description,
            user_id: req.userData.id
        }

        Task.create(newTask)
        .then(data => {
            if (data) {
                res.status(201).json(`Task created`)
            }
        })
        .catch(err => {
            next(err)
        }) 
    }

    static filter (req, res, next) {
        Task.findByPk(req.params.id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static edit (req, res, next) {
        let updateTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }
        
        Task.update(updateTask,{where:{id:req.params.id}})
        .then(data => {
            res.status(201).json(`Update successfull`)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        Task.destroy({where:{id:req.params.id}})
        .then(data => {
            res.status(200).json(`Delete successfull`)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController