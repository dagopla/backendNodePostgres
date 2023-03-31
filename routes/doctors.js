const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateJwt } = require("../middlewares/validate-jwt");
const { getDoctor, createDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctors");
const router =Router();

router.get('/:id',getDoctor);
router.post('/',[validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital es obligatorio').not().isEmpty(),
    validarCampos
] , createDoctor);

router.put('/:id',[
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital es obligatorio').not().isEmpty(),
    validarCampos
], updateDoctor);

router.delete('/:id',validateJwt,deleteDoctor);

module.exports=router;