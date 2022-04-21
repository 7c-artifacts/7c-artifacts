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
  const poem = await Poem.findByPk(req.query.poem, {include: [models.Tag, models.User]});
	let deleted = false;
	if (poem.users.map(i => i.id).includes(session.pk )) {
		await poem.destroy();
		deleted = true;
	} else {
		console.log(poem.users.map(i => i.id));
	}
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, deleted: deleted, title: poem.title });
  // sequelize.close();
}
