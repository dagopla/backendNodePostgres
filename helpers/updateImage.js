const fs = require('fs');
const { models } = require('../libs/postgres.js');


const deleteImg = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        return true
    }
    return false
}
const updateImage = async (tipo, id, path, nombre) => {

    switch (tipo) {
        case 'doctor':
            const doctor = await models.Doctor.findByPk(id);
            if (!doctor) {
                console.log('No es un médico por id');
                return false;
            }
            // Si existe, elimina la imagen anterior
            deleteImg(`./uploads/${tipo}/${doctor.img}`)
            await models.Doctor.update({ img: nombre }, { where: { id } });
            return true;

        case 'user':

            const user = await models.User.findByPk(id);
            if (!user) {
                console.log('No es un usuario por id');
                return false;
            }
            deleteImg(`./uploads/${tipo}/${user.image}`)

            await models.User.update({ image: nombre }, { where: { id } });
            return true;

        case 'hospital':

            const hospital = await models.Hospital.findByPk(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }
            deleteImg(`./uploads/${tipo}/${hospital.img}`)

            await models.Hospital.update({ img: nombre }, { where: { id } });
            return true;

        default:
            return false;
    }



}
module.exports = {
    updateImage,
    deleteImg
}
