import { DataTypes } from "sequelize";

export default (sequelize) => {
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