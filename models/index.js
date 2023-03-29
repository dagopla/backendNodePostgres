const { User,UserSchema } = require("./usuario")

setupModels=(sequelize)=>{
    User.init(UserSchema, User.config(sequelize));


}
module.exports={
    setupModels
}