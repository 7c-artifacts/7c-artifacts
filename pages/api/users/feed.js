// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {models, sequelize} = require("../../../models/models");
const { Op } = require("sequelize");
import { getSession } from "next-auth/react";



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


    const comments = await models.Comment.findAll({
			order: [["createdAt", "DESC"]],
			distinct : true,
			limit: 100,
			subQuery: false,
			where: {
				userId: session.pk
			}, 
			include: [{
				model: models.Poem,
				distinct: true,
				attributes: {
					exclude: ["text"]
				}
			}]
    });

		const user = await User.findByPk(session.pk, {
			order: [["createdAt", "DESC"]],
			distinct : true,
			limit: 100,
			subQuery: false,
			where: {
				userId: session.pk
			}, 
			through: {
				attributes: []
			},
			include: [{
				model: models.Poem,
				distinct: true,
				attributes: {
					exclude: ["text"]
				},
				through: {
					attributes: []
				},
			}]
		})
	
		let relatedPosts = [];

		comments.forEach((item, i) => {
			if (item.poem) {
				relatedPosts.push(item.poem);
			}
		})
		user.poems.forEach((item, i) => {
			if (relatedPosts.map(l => l.id).includes(item.id)) {
				return;
			}
			relatedPosts.push(item);
		})

		const obj = await models.Poem.findAll({
			limit: 20,
			where: {
				id: {
					[Op.or]: relatedPosts.map(l => l.id)
				}
			},
			include: [{
				model: models.Comment,
				limit: 1,
				order: [["createdAt", "desc"]],
				where: {
					userId: {
						[Op.not]: session.pk
					}
				},
				include: [models.User, {
					model: models.Poem,
					attributes: ["title", "id"]
				}]
			}]
		});

		let final = [];

		obj.forEach((ite, k) => {
			if (ite.comments[0]) {
				final.push(ite.comments[0]);
			}
		})
		final = final.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

    const timeend = Date.now();

    res.status(200).json({ time: timeend - time, comments: final });
    // sequelize.close();
}
