const router = require(`express`).Router()
const UserController = require(`../controllers/userController`)

router.post(`/register`, UserController.register)
router.post(`/login`, UserController.login)
router.post(`/googleSign`, UserController.gSign)

module.exports = router