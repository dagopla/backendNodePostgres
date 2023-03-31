const { Doctor,DoctorSchema } = require("./doctor");
const { Hospital,HospitalSchema } = require("./hospital");
const { User,UserSchema } = require("./usuario")

setupModels=(sequelize)=>{
    User.init(UserSchema, User.config(sequelize) );
    Hospital.init(HospitalSchema, Hospital.config(sequelize));
    Doctor.init(DoctorSchema, Doctor.config(sequelize));

    User.associate(sequelize.models);
    Hospital.associate(sequelize.models);
    Doctor.associate(sequelize.models);
}
module.exports={
    setupModels
}