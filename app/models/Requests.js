const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Requests = sequelize.define('requests', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    requestData: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: 'email,phone,imagePath'
    },
    requestStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '1->waiting approve 2->approved 3->cancelled 4->deleted 5->closed'
    }
});

module.exports = Requests;