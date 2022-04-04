// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequelize from "../../components/client"
import models from "../../models/models";


export default async function handler(req, res) {
  const TestModel = models.TestModel(sequelize)

  const time = Date.now();
  await TestModel.create({
    firstName: req.query.name,
    lastName: 'Doe'
  });
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time });
}
