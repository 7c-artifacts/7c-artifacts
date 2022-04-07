// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {models} = require("../../../models/models");
import { getSession } from "next-auth/react";

function getPage(page) {
	if (!isNaN(Number(page))) {
		if (Number(page) > 0) {
			return Number(page);
		} else {
			return 1;
		}
	} else {
		return 1;
	}
}

export default async function handler(req, res) {

    const session = await getSession({ req });
    if (!session) {
        res.status(403).json({error: ["Incorrect account or not signed in"]});
        res.end();
        // sequelize.close();
        return;
    }
    const Poem = models.Poem;
    const page = getPage(req.query.p)
    const time = Date.now();
    const poems = await Poem.findAndCountAll({
        limit: 5,
        offset: page * 5 - 5,
        include: [models.Tag, models.User],
        attributes: {
            exclude: ["text"]
        },
        distinct:true

    });
    const timeend = Date.now();

    res.status(200).json({ time: timeend - time, poems: poems });
    // sequelize.close();
}
