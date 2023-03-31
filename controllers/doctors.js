const {models}=require('../libs/postgres.js');

const getDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const doctor = await models.Doctor.findByPk(doctorId);
    if (!doctor) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un Doctor con ese id'
        });
    }
    try {
        res.json({
            ok: true,
            doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};
const createDoctor = async (req, res) => {
    const { name,hospital } = req.body;
    const uid=req.uid;
    console.log(uid);
    const hospitalSelected = await models.Hospital.findByPk(hospital);
    if (!hospitalSelected) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un hospital con ese id'
        });
    }
    try {
        await models.Doctor.create({ name, userId:uid, hospitalId:hospital });
        res.json({
            ok: true,
            name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const updateDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const { name, status } = req.body;
    try {
        const doctor = await models.Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Doctor con ese id'
            });
        }
        
        await models.Doctor.update(req.body, { where: { id: doctorId } });
        res.json({
            ok: true,
            msg: 'Doctor actualizado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const doctor = await models.Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Doctor con ese id'
            });
        }
        await models.Doctor.destroy({ where: { id: doctorId } });
        res.json({
            ok: true,
            msg: 'Doctor eliminado'
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
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor

}