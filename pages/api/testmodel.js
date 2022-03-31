// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequelize from "../../components/client"
import models from "../../models/models";
// import { models } from '@next-auth/sequelize-adapter';

export default async function handler(req, res) {
  await sequelize.sync();
  const TestModel = models.TestModel(sequelize)
  
  const time = Date.now();
  const users = await TestModel.findAll();
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, users: users});
}
