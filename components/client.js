import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://localhost:5432/postgres') // Example for postgres
sequelize.sync({  });
export default sequelize;