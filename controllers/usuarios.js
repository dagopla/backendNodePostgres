const bcrypt= require('bcryptjs');
const { response } = require('express');
const { models } = require('../libs/postgres.js');
const { generateToken } = require('../helpers/jwt.js');
const getUsers = async (req, res) => {
    const from=Number(req.query.from)||0;
    const [users,total]=await Promise.all(
        [
            models.User.findAll({offset:from,limit:5}),
            models.User.count()
        ]
    );
    const response=users.map(user=>{
        const {password,...userWithoutPassword}=user.dataValues;
        return userWithoutPassword;
    })
    res.json({
        ok: true,
        usuarios: response,
        total
    });

}
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existeEmail = await models.User.findOne({ where: { email: email } });
        if (existeEmail!=null) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const salt = bcrypt.genSaltSync();
        req.body.password= bcrypt.hashSync(password, salt);
        const newUser=await models.User.create(req.body);
        const token = await generateToken(newUser.dataValues.id);
        res.json({
            ok: true,
            usuario: req.body,
            token   
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const updateUser=async (req,res=response)=>{
    const userId= req.params.id;
    const {password,google,...campos}=req.body;
    try {
        const userExist=await models.User.findByPk(userId);

        if (!userExist) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            })
        }
        if (userExist.email!==campos.email) {
            const emailExist=await models.User.findOne({where:{email:campos.email}});
            if (emailExist) {
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email'
                })
            }
        }else{
            delete campos.email;
        }

        const userUpdate=await models.User.update(req.body,{where:{id:userId}});
        res.json({
            ok:true,
            msg:'Usuario actualizado',
            user:{userUpdate,...userExist}
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}
const deleteUser=async (req,res=response)=>{
    const userId= req.params.id;
    try {
        const userExist=await models.User.findByPk(userId);

        if (!userExist) {
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario con ese id'
            })
        }
        await models.User.destroy({where:{id:userId}});
        res.json({
            ok:true,
            msg:'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}