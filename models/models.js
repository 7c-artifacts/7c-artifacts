import { DataTypes } from "sequelize";
import { models } from "@next-auth/sequelize-adapter"

export default {
    TestModel: (sequelize) => {
        const model = sequelize.define('TestModel', {
            // Model attributes are defined here
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING
                // allowNull defaults to true
            }
            }, {
            // Other model options go here
        });
        return model;
    },
    User: (sequelize) => {
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
}  