const { models } = require("@next-auth/sequelize-adapter");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const model = sequelize.define('poem', {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1, 100],
            }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [20, Infinity]
            }
        },
			
    }, {
			paranoid: true
    });
    // model.hasMany(Models.Poem(sequelize), { foreignKey: 'userId', allowNull: false  });
    
    return model;
}