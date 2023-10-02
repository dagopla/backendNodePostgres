const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser,updateUser, deleteUser } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJwt } = require("../middlewares/validate-jwt");
const router =Router();

router.get('/' ,getUsers);
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
] , createUser);

router.put('/:id',[
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos
], updateUser);

router.delete('/:id',validateJwt,deleteUser);

module.exports=router;