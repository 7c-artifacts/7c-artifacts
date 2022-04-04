/* eslint-disable import/no-anonymous-default-export */
const { models } = require("@next-auth/sequelize-adapter");
const { DataTypes } = require("sequelize");

module.exports =  (sequelize) => {
    delete models.Account.userId;
    const model = sequelize.define('account', {
        // Model attributes are defined here
            ...models.Account,
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            providerAccountId: { type: DataTypes.TEXT, allowNull: false },
            refresh_token: { type: DataTypes.TEXT },
            access_token: { type: DataTypes.TEXT },
            token_type: { type: DataTypes.TEXT },
            scope: { type: DataTypes.TEXT },
            id_token: { type: DataTypes.TEXT },
            session_state: { type: DataTypes.TEXT },
        }, {
        // Other model options go here
    });
    
    return model;
}
