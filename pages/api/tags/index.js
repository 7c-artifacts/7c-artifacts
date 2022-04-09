// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {models, sequelize} = require("../../../models/models");
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
    const Tag = models.Tag;
    const page = getPage(req.query.p)
    const time = Date.now();
    // let tags = await Tag.findAll({
    //     limit: 5,
    //     offset: page * 5 - 5,
    //     group: sequelize.col("tag.id"),
    //     attributes: {
    //         exclude: ['createdAt', 'updatedAt'],
    //         include: []
    //     },
    //     order: [
    //         // sequelize.fn("max", sequelize.col("tag.id"))
    //     ],
    //     include: [
    //         {
    //             model: models.Poem, attributes: [
    //                 [sequelize.fn("COUNT", sequelize.col("poems.id")), "num_stories"]
    //             ],
    //         }
    //     ],
    //     // includeIgnoreAttributes:false,
    // });

    const tags = await Tag.findAndCountAll({
        include : [
            { model: models.Poem, attributes: [] },
        ],
        attributes : {
            include: ['tag.id', [sequelize.fn('COUNT', sequelize.col('poems.id')), 'poems_count']],
            exclude: ['createdAt', 'updatedAt']
        },
        order: [[sequelize.literal('poems_count'), 'DESC']],
        group : ['tag.id'],
        includeIgnoreAttributes : false,
        distinct : true,
        limit: 12,
        offset: page * 12 - 12,
        subQuery: false
    });

    tags.count = tags.count.length;

    const timeend = Date.now();

    // let count = {total: 0, data: {}};
    // tags.count.forEach(coun => {
    //     count.total += coun.count;
    //     count.data[coun.id] = coun.count;
    // });
    // tags.count = count;

    res.status(200).json({ time: timeend - time, tags: tags });
    // sequelize.close();
}
