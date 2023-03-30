const {models}=require('../libs/postgres.js');

const getHospital = async (req, res) => {
    const hospitalId = req.params.id;
    
    try {
        const hospital = await models.Hospital.findByPk(hospitalId);
        res.json({
            ok: true,
            hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};
const createHospital = async (req, res) => {
    const { name } = req.body;
    const uid=req.uid;
    console.log(uid);
    try {
        await models.Hospital.create({ name, userId:uid });
        res.json({
            ok: true,
            hospital:name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const updateHospital = async (req, res) => {
    const hospitalId = req.params.id;
    const { name, status } = req.body;
    try {
        const hospital = await models.Hospital.findByPk(hospitalId);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }
        await models.Hospital.update(req.body, { where: { id: hospitalId } });
        res.json({
            ok: true,
            msg: 'Hospital actualizado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const deleteHospital = async (req, res) => {
    const hospitalId = req.params.id;
    try {
        const hospital = await models.Hospital.findByPk(hospitalId);
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }
        await models.Hospital.destroy({ where: { id: hospitalId } });
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
module.exports = {
    getHospital,
    createHospital,
    deleteHospital,
    updateHospital
}