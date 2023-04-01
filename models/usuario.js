const {Model, Sequelize, DataTypes }=require('sequelize');

const USER_TABLE='users';
const UserSchema={
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,

    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER_ROLE',
    },
    google:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true,
        
    },

    creatAt:{
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },

}

class User extends Model{
    static associate(models){
        this.hasMany(models.Hospital, {foreignKey: 'userId', as: 'hospital'});
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
        }
    }
}

module.exports={User, UserSchema, USER_TABLE};