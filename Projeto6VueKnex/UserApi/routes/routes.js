const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

const Auth = require('../middleware/Auth')


router.get('/', HomeController.index);

//usuarios
router.post('/user', UserController.create);
router.get('/user', Auth, UserController.select);
router.get('/user/:id', Auth, UserController.selectUser);
router.put('/user/', Auth, UserController.edit)
router.delete('/user/:id', Auth, UserController.delete)

router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword)

router.post('/login', UserController.login)

router.post('/validate', Auth, HomeController.validate)

module.exports = router;