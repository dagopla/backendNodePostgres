const Usuario = require('../models/usuario.js');
const { models } = require('../libs/postgres.js');
const { validationResult } = require('express-validator');
const getUsers = async (req, res) => {
    const rta = await models.User.findAll();
    res.json({
        ok: true,
        usuarios: rta
    });
}
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    try {
        const existeEmail = await models.User.findOne({ where: { email: email } });
        if (existeEmail!=null) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        await models.User.create(req.body);
        res.json({
            ok: true,
            usuario: req.body
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getUsers,
    createUser
}