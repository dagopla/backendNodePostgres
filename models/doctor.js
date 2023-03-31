const {Model, DataTypes }=require('sequelize');
const {USER_TABLE}=require('./usuario');
const {HOSPITAL_TABLE}=require('./hospital');
const DOCTOR_TABLE='doctors';
const DoctorSchema={
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
    hospitalId:{
        field:'hospital_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: HOSPITAL_TABLE,
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

class Doctor extends Model{
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'userId', as: 'users'});
        this.belongsTo(models.Hospital, {foreignKey: 'hospitalId', as: 'hospitals'});
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: DOCTOR_TABLE,
            modelName: 'Doctor',
            timestamps: false,
        }
    }
}

module.exports={Doctor, DoctorSchema, DOCTOR_TABLE};