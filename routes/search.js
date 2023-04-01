const { Router } = require("express");
const { validateJwt } = require("../middlewares/validate-jwt");
const { getAll, getDocumentCollection } = require("../controllers/search");

const router=Router();

router.get('/:search', validateJwt,getAll);
router.get('/collection/:table/:search', validateJwt,getDocumentCollection);



module.exports=router;
