// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequelize from "../../../components/client"
import Models from "../../../models/models"

const models = Models(sequelize);

export default async function handler(req, res) {
  await sequelize.sync();

  const Poem = models.Poem;
  
  const time = Date.now();
  const poems = await Poem.findAll();
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, poems: poems });
}
