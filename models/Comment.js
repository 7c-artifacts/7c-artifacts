const { models } = require("@next-auth/sequelize-adapter");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const model = sequelize.define('comment', {
        // Model attributes are defined here
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