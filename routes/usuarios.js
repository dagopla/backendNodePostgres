const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser } = require("../controllers/usuarios");

const router =Router();

router.get('/', getUsers);
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({min:6})
] , createUser);


module.exports=router;