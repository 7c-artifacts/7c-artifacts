/* eslint-disable import/no-anonymous-default-export */
const { models } = require("@next-auth/sequelize-adapter");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const model = sequelize.define('user', {
        // Model attributes are defined here
            ...models.User,
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            }
        }, {
        // Other model options go here
    });
    
    return model;
}