const router = require(`express`).Router()
const TaskController = require(`../controllers/taskController`)
const authentication = require(`../middlewares/authentication`)
const authorization = require(`../middlewares/authorization`)


router.get(`/`, authentication, TaskController.show)
router.post(`/add`, authentication, TaskController.add)
router.get(`/:id`, authentication, authorization, TaskController.filter)
router.put(`/edit/:id`, authentication, authorization, TaskController.edit)
router.delete(`/delete/:id`, authentication, authorization, TaskController.delete)


module.exports = router