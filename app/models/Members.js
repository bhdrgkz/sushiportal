const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Members = sequelize.define('members', {
		memberId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		locationId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null,
		},
		positionId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null,
		},
		userPoint: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		},
		changePassword: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		emailStatus: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 1,
		},
		memberType: {
			type: DataTypes.TINYINT,
			allowNull: false,
			defaultValue: 1,
		},
		pageType: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		adminkey: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		appversion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		adddate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		addip: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastDate: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null,
		},
		lastIp: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		resetToken: {
			type: DataTypes.STRING,
			allowNull: true
		},
		resetTokenExpiry: {
			type: DataTypes.DATE,
			allowNull:true
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
  	},
	{
		indexes: [
			// Create a unique index on email
			{
				unique: true,
				fields: ['email']
			}],
	});

module.exports = Members;