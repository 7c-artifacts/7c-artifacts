import { DataTypes } from "sequelize";
import { models } from "@next-auth/sequelize-adapter"

const Models = {
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
        model.hasMany(Models.Poem(sequelize), { allowNull: false });
        return model;
    },
    Poem: (sequelize) => {
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
                    len: [20]
                }
            }
        }, {

        });
        // model.hasMany(Models.Poem(sequelize), { foreignKey: 'userId', allowNull: false  });
        model.belongsTo(Models.User(sequelize), { as: "author", allowNull: false  });
        model.belongsToMany(Model.Tag(sequelize), { through: 'poemtags', allowNull: true });
        return model;
    },
    Tag: (sequelize) => {
        const model = sequelize.define('tag', {
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING(20),
                allowNull: true,
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
        model.belongsToMany(Model.Tag(sequelize), { through: 'poemtags', allowNull: false });
        return model;
    },
    PoemTag: (sequelize) => {
        const model = sequelize.define('poemtag', {
            // Model attributes are defined here
            poemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'poems',
                    key: "id"
                }                
            },
            tagId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tags',
                    key: "id"
                }   
            }
        }, {

        });
        
        return model;
    }
}  

export default Models;