const { Router } = require("express");
const { check } = require("express-validator");
const { getHospital, createHospital, deleteHospital, updateHospital } = require("../controllers/hospitals");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJwt } = require("../middlewares/validate-jwt");
const router =Router();

router.get('/', validateJwt ,getHospital);
router.post('/',[validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , createHospital);

router.put('/:id',[
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], updateHospital);

router.delete('/:id',validateJwt,deleteHospital);

module.exports=router;