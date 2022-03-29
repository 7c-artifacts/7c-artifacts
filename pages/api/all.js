// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Sequelize } from 'sequelize';
import models from "../../models/models";
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../maindb.db'
});

export default async function handler(req, res) {
  await sequelize.sync();
  const TestModel = models.TestModel(sequelize)

  const time = Date.now();
  const users = await TestModel.findAll();
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, users: users});
}
