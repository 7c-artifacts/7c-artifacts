/* eslint-disable import/no-anonymous-default-export */
const { models } = require("@next-auth/sequelize-adapter");
const { DataTypes } = require("sequelize");

module.exports =  (sequelize) => {
    delete models.Session.userId;
    const model = sequelize.define('session', {
        // Model attributes are defined here
            ...models.Session,
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
