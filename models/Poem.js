import User from "./User"
import { DataTypes } from "sequelize";
import Tag from "./Tag"

export default (sequelize) => {
    const model = sequelize.define('poem', {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1, 100],
            },
            unique: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [20, Infinity]
            }
        }
    }, {

    });
    // model.hasMany(Models.Poem(sequelize), { foreignKey: 'userId', allowNull: false  });
    
    return model;
}