/* eslint-disable import/no-anonymous-default-export */
import { models } from "@next-auth/sequelize-adapter"
import { DataTypes } from "sequelize";

export default (sequelize) => {
    const model = sequelize.define('verificationtoken', {
        // Model attributes are defined here
            ...models.VerificationToken,
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