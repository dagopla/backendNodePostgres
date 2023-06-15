const { Router } = require("express");
const { check } = require("express-validator");
const { login, loginWithGoogle, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJwt } = require("../middlewares/validate-jwt");

const router =Router();

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos
],login);
router.post('/google',[
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
],loginWithGoogle);
router.get('/renew',validateJwt, renewToken);








module.exports=router;