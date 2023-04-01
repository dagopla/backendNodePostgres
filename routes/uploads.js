const { Router } = require("express");
const fileUpload=require('express-fileupload');
const { validateJwt } = require("../middlewares/validate-jwt");
const { putAttachment, returnImg } = require("../controllers/uploads");

const router=Router();
router.use(fileUpload());
router.put('/:type/:id',validateJwt,putAttachment);
router.get('/:type/:img',validateJwt,returnImg);


module.exports=router;