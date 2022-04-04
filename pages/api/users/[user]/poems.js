// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {models, sequelize} = require("../../../../models/models");
import { getSession } from "next-auth/react";


export default async function handler(req, res) {

  const session = await getSession({ req });
  if (!session) {
      res.status(403).json({error: ["Incorrect account or not signed in"]});
      res.end();
      // sequelize.close();
      return;
  }
  const Poem = models.Poem;
  
  const time = Date.now();
  const poems = await Poem.findAll({where: {userId: req.query.user}, include: models.Tag});
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, poems: poems });
  // sequelize.close();
}
