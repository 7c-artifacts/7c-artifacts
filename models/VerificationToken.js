/* eslint-disable import/no-anonymous-default-export */
const { models } = require("@next-auth/sequelize-adapter");
const { DataTypes } = require("sequelize");

module.exports =  (sequelize) => {
    const model = sequelize.define('verificationtoken', {
        // Model attributes are defined here
            ...models.VerificationToken
        }, {
        // Other model options go here
    });
    
    return model;
}