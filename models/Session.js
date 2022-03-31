/* eslint-disable import/no-anonymous-default-export */
import { models } from "@next-auth/sequelize-adapter"
import { DataTypes } from "sequelize";

export default (sequelize) => {
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
