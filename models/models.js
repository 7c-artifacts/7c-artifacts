const { DataTypes, Sequelize } = require("sequelize")
const User = require("./User");
const Poem = require("./Poem");
const Tag = require("./Tag");
const PoemTag = require("./PoemTag");
const Session = require("./Session");
const Account = require("./Account");
const VerificationToken = require("./VerificationToken");


let sequelize;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._sequelize) {
        sequelize = new Sequelize(process.env.MYSQL_USERDB, process.env.MYSQL_USERDB, process.env.MYSQL_PASS, {
            host: "remotemysql.com",
            dialect: "mysql",
            port: 3306
        });
        global._sequelize = sequelize;
    }
    sequelize = global._sequelize;
  } else {
    // In production mode, it's best to not use a global variable.
    sequelize = new Sequelize(process.env.MYSQL_USERDB, process.env.MYSQL_USERDB, process.env.MYSQL_PASS, {
        host: "remotemysql.com",
        dialect: "mysql",
        port: 3306
    });
  }
  

console.log("\tCreating connection to SQL db!")

// sequelize.sync({  });

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
    User,
    Poem,
    Tag,
    PoemTag,
    Session,
    Account,
    VerificationToken,
    Final: (sequelize) => {
        const tag = Tag(sequelize);
        const user = User(sequelize);
        const poem = Poem(sequelize);
        const session = Session(sequelize);
        const verificationtoken = VerificationToken(sequelize);
        const account = Account(sequelize);
        
        tag.belongsToMany(poem, { through: 'poemtags', allowNull: false });
        user.hasMany(poem, { allowNull: true });
        poem.belongsTo(user, { allowNull: false  });
        poem.belongsToMany(tag, { through: 'poemtags', allowNull: true });
        return {
            Tag: tag,
            User: user,
            Poem: poem,
            Session: session,
            VerificationToken: verificationtoken,
            Account: account
        }
    }
}  




module.exports = {models: Models.Final(sequelize), sequelize: sequelize};