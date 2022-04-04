/* eslint-disable import/no-anonymous-default-export */
const { models } = require("@next-auth/sequelize-adapter");
const { DataTypes } = require("sequelize");

module.exports =  (sequelize) => {
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