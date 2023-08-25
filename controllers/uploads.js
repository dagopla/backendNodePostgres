const {v4:uuidv4}=require('uuid');
const path=require('path');
const fs = require('fs');
const { updateImage, deleteImg } = require('../helpers/updateImage.js');
const { log } = require('console');
const putAttachment= async (req, res) => {
    const tipo=req.params.type;
    const id=Number(req.params.id);

    // Validar tipo
    const tiposValidos = ['hospital', 'doctor', 'user'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }
    const file = req.files.image;
    console.log(file);
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];   
    // Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }
    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    const update=updateImage(tipo, id, path, nombreArchivo);
    if(!update){
        return res.status(400).json({
            ok: false,
            msg: 'No se pudo actualizar la imagen'
        });
    }
    // Mover la imagen
    file.mv(path, (err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const returnImg = (req, res) => {
    const tipo = req.params.type;
    const foto = req.params.img;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/No-image-found.jpg`);
    }
    res.sendFile(pathImg);
}



module.exports = {
    putAttachment,
    returnImg
}
