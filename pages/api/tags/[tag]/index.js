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
  const Tag = models.Tag;
  
  const time = Date.now();
  const tag = await Tag.findByPk(req.query.tag, {include: [{
      model: models.Poem,
      attributes: {
          exclude: ["text"]
      },
      through: {
            attributes: []
        },
        include: [{
            model: models.User,
            attributes: ["name"],
        },
        {
            model: models.Tag,
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            through: {
                attributes: []
            }
        }]
    //   separate: true, 
    }],
    order: [
        [ models.Poem, 'createdAt', 'DESC' ]
    ]});
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, tag:tag });
  // sequelize.close();
}
