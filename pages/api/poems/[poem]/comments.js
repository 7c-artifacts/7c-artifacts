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
  const Comment = models.Comment;
  
  const time = Date.now();
  const comments = await Comment.findAll({include: [{model: models.User, attributes: ["name", "id", "image"]}, {model: models.Poem, attributes: []}], where: {poemId: req.query.poem}, order: [['createdAt', 'DESC']], attributes: ["id", "createdAt", "text"]});
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, comments:comments });
  // sequelize.close();
}
