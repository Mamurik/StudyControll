const sequelize = require("../db")
const DataTypes = require("sequelize")

const User = sequelize.define("user",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username:{type:DataTypes.STRING,unique:true},
    password:{type:DataTypes.STRING,unique:true},
    role:{type:DataTypes.STRING,defaultValue:"student"}
})

const Subject = sequelize.define("subject",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:{type:DataTypes.STRING,unique:true},
    total_labs:{type:DataTypes.INTEGER},
})
const Lab = sequelize.define("lab",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lab_number:{type:DataTypes.INTEGER},
    max_points:{type:DataTypes.INTEGER,defaultValue:5}
})
const UserLabProgress = sequelize.define("userLabProgress",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { 
        type: DataTypes.INTEGER, 
        validate: { min: 0, max: 5 }, 
        defaultValue: 0 
    }
})

// User -> UserLabProgress (1 ко многим)
User.hasMany(UserLabProgress);
UserLabProgress.belongsTo(User);

// Subject -> Lab (1 ко многим)
Subject.hasMany(Lab);
Lab.belongsTo(Subject);

// Lab -> UserLabProgress (1 ко многим)
Lab.hasMany(UserLabProgress);
UserLabProgress.belongsTo(Lab);


module.exports={
        User,
        Subject,
        Lab,
        UserLabProgress
}