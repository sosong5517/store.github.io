const express = require('express');
const router = express.Router();
const { registerUser, getMyUser, getAllUsers, deleteUser,updateUser } = require("../controllers/user.controller");
const UserService = require('../services/auth.service');
const tokenValidation = require('../middlewares/token-validation')
const basicAuth = require('../middlewares/basic-auth-helper');
router.use(basicAuth.init());


const userService = new UserService();
router.post('/register', basicAuth.isAuthenticated, (req, res, next) => registerUser(req, res, userService));
router.get('/',tokenValidation, (req, res, next) => getAllUsers(req, res, userService));
router.get('/:id', (req, res, next) => getMyUser(req, res, userService));
router.delete('/:id', (req, res, next) => deleteUser(req, res, userService));
router.patch('/:id',(req,res,next)=> updateUser(req,res,userService)); 


module.exports = router;