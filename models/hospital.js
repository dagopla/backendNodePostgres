const {Model, DataTypes }=require('sequelize');
const{USER_TABLE}=require('./usuario');
const HOSPITAL_TABLE='hospitals';
const HospitalSchema={
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
    img:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId:{
        field:'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },

}

class Hospital extends Model{
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
        this.hasMany(models.Doctor, {foreignKey: 'hospitalId', as: 'doctor'});
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: HOSPITAL_TABLE,
            modelName: 'Hospital',
            timestamps: false,
        }
    }
}

module.exports={Hospital, HospitalSchema, HOSPITAL_TABLE};