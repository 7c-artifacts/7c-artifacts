import { Sequelize } from "sequelize";

var sequelize = new Sequelize(process.env.MYSQL_USERDB, process.env.MYSQL_USERDB, process.env.MYSQL_PASS, {
    host: "remotemysql.com",
    dialect: "mysql",
    port: 3306,
    define: {
        paranoid: true
    }
});
sequelize.sync({  });
export default sequelize;

