import Poem from "./Poem"
import { DataTypes } from "sequelize";

export default (sequelize) => {
    const model = sequelize.define('tag', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                len: [1, 20],
                notNull: {
                    msg: "Tag name cannot be empty.",
                }
            },
            unique: true
        }
    }, {

    });
    
    return model;
}