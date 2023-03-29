const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateToken } = require('../helpers/jwt.js');
const { models } = require('../libs/postgres.js');

const login = async (req, res=response) => {

    const { email, password } = req.body;
    try {
        const userExist=await models.User.findOne({where:{email:email}});
        if (!userExist) {
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email'
            });
        }
        // Confirmar los passwords
        const validPassword=bcrypt.compareSync(password,userExist.password); 
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            });
        }
        // Generar el JWT
        const token= await generateToken(userExist.id);
        res.json({
            ok:true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }
}

module.exports = {
    login
}