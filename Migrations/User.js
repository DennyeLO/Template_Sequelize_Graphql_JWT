'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
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
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user');
    }
};