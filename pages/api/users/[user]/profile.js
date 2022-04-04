// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import { getSession } from "next-auth/react";
const {models, sequelize} = require("../../../../models/models");


export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
      res.status(403).json({error: ["Incorrect account or not signed in"]});
      res.end();
      // sequelize.close();
      return;
  }
  const User = models.User;
  
  const time = Date.now();
  const user = await User.findByPk(req.query.user);
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, user: user });
  // sequelize.close();
}
