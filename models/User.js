import Poem from "./Poem"
import { models } from "@next-auth/sequelize-adapter"
import { DataTypes } from "sequelize";

export default (sequelize) => {
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