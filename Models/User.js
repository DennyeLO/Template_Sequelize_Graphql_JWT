const Sequelize = require('sequelize');
const db = require ('../Database/Db');

const User = db.sequelize.define('user',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey : true
    },
    username : {
        type : Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password : {
        type : Sequelize.STRING
    },
});

module.exports = User