// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {models, sequelize} = require("../../../models/models");
const { Op } = require("sequelize");
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
    let sort = req.query.sort;
    let query = req.query.query;
    if (sort == "new") sort = [['createdAt', 'DESC']];
    else if (sort == "old") sort = [['createdAt', 'ASC']];
    else if (sort == "most") sort = [[sequelize.literal('poems_count'), 'DESC']];
    else if (sort == "least") sort = [[sequelize.literal('poems_count'), 'ASC']];
    else sort = [[sequelize.literal('poems_count'), 'DESC']];
    let where = {};
    if (query) {
        where = {
            where: {
                name: {
                    [Op.like]: `%${query.replace(/\%/g, "")}%`
                }
            }
        };
    }

    const tags = await Tag.findAndCountAll({
        include : [
            { model: models.Poem, attributes: [] },
        ],
        attributes : {
            include: ['tag.id', [sequelize.fn('COUNT', sequelize.col('poems.id')), 'poems_count']],
            exclude: ['createdAt', 'updatedAt']
        },
        order: sort,
        group : ['tag.id'],
        includeIgnoreAttributes : false,
        distinct : true,
        limit: 12,
        offset: page * 12 - 12,
        subQuery: false,
        ...where
    });

    tags.count = tags.count.length;

    const timeend = Date.now();

    // let count = {total: 0, data: {}};
    // tags.count.forEach(coun => {
    //     count.total += coun.count;
    //     count.data[coun.id] = coun.count;
    // });
    // tags.count = count;

    res.status(200).json({ time: timeend - time, tags: tags, length: tags.rows.length });
    // sequelize.close();
}
