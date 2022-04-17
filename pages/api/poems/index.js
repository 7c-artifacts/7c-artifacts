// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {models, sequelize} = require("../../../models/models");
import { getSession } from "next-auth/react";
const {Op} = require("sequelize");

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
    let sort = req.query.sort;
    
    if (sort === "new") {
        sort = ['createdAt', 'DESC'];
    } else if (sort === "old") {
        sort = ['createdAt', 'ASC'];
    } else {
        sort = ['createdAt', 'DESC'];
    }
    let query = req.query.query;
    let where = {};
    if (query) {
        where = {
            where: {
                [Op.or]: {
                    title: {
                        [Op.like]: `%${query.replace(/\%/g, "")}%`
                    },
                    // '$tags.name$': {
                    //     [Op.like]: `%${query.replace(/\%/g, "")}%`
                    // },
                    // '$user.name$': {
                    //     [Op.like]: `%${query.replace(/\%/g, "")}%`
                    // }
                }
            }
        };
    }
    
    const time = Date.now();
    // here be dragons lol
    const poems = await Poem.findAndCountAll({
        // groupedLimit: 5,
        limit: 10,
        // raw: true,
        offset: page * 10 - 10,
        include: [
            {
                model: models.Tag,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                through: {
                    attributes: []
                },
                // separate: true
                // right: true
                // required: true
            }, {
                model: models.User,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "image", "emailVerified"],
                    include: ["id", "name"]
                },
                // right: true
                // required: true
                // separate: true
            }],
        attributes: {
            exclude: ["text"]
        },
        order: [sort],
        // group : ['poem.id', 'tags.id', 'user.id'],
        includeIgnoreAttributes : true,
        distinct : true,
        // subQuery: false,
        ...where,
        // separate: true
    });

    // poems.count = poems.count.length;
    const timeend = Date.now();

    res.status(200).json({ time: timeend - time, poems: poems, length: poems.rows.length });
    // sequelize.close();
}
