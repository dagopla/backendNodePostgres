
const { Op } = require('sequelize');
const { models } = require('../libs/postgres.js');
const { HOSPITAL_TABLE } = require('../models/hospital.js');

const getAll = async (req, res) => {
    const search = req.params.search;
    const regex = { [Op.iLike]: `%${search}%` };
    const [users, hospitals, doctors] = await Promise.all([
        models.User.findAll({ where: { name: regex } }),
        models.Hospital.findAll({ where: { name: regex } }),
        models.Doctor.findAll({ where: { name: regex } }),
    ]);


    res.json({
        ok: true,
        msg: 'get all',
        users,
        hospitals,
        doctors
    });
}
const getDocumentCollection = async (req, res) => {
    const search = req.params.search;
    const table = req.params.table;
    const regex = { [Op.iLike]: `%${search}%` };
    let data = [];
    switch (table) {
        case 'doctors':
            data = await models.Doctor.findAll({
                where: { name: regex },
                include:[
                    {
                        model:models.Hospital,
                        as:'hospital',
                        attributes:['name','img'],

                    },
                    {
                        model:models.User,
                        as:'user',
                        attributes:['name','email'],
                        
                    }
                ],
                    
            });
            break;
        case 'hospitals':
            data = await models.Hospital.findAll({
                where: { name: regex },
                include: [
                    {
                        model: models.User,
                        as: 'user',
                        attributes: ['name', 'img'],
                    },
                ],
            });
            break;
        case 'users':
            data = await models.User.findAll({
                where: { name: regex },
            });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser collection/doctors/hospitals',
            });
    }
    res.json({
        ok: true,
        results: data,
    });
}

module.exports = {
    getAll,
    getDocumentCollection,
}