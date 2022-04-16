// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// const { models, sequelize } = require("../../../../models/models");
// import { getSession } from "next-auth/react";

// function getPage(page) {
// 	if (!isNaN(Number(page))) {
// 		if (Number(page) > 0) {
// 			return Number(page);
// 		} else {
// 			return 1;
// 		}
// 	} else {
// 		return 1;
// 	}
// }

// export default async function handler(req, res) {
//     const session = await getSession({ req });
//     if (!session) {
//         res.status(403).json({ error: ["Incorrect account or not signed in"] });
//         res.end();
//         sequelize.close();
//         return;
//     }
//     const page = getPage(req.query.p)
//     const Tag = models.Tag;
//     let sort = req.query.sort;
//     let query = req.query.query;
//     if (sort == "new") sort = [["createdAt", "DESC"]];
//     else if (sort == "old") sort = [["createdAt", "ASC"]];

//     let where = {};
//     if (query) {
//         where = {
//             where: {
//                 [Op.or]: {
//                     title: {
//                         [Op.like]: `%${query.replace(/\%/g, "")}%`
//                     },
//                     // '$tags.name$': {
//                     //     [Op.like]: `%${query.replace(/\%/g, "")}%`
//                     // },
//                     // '$user.name$': {
//                     //     [Op.like]: `%${query.replace(/\%/g, "")}%`
//                     // }
//                 }
//             }
//         };
//     }

//     const time = Date.now();
//     const tag = await Tag.findOne({ where: { id: req.query.tag } });

//     const poems = await tag.getPoems({
//         where,
//         limit: 10,
//         // raw: true,
//         offset: page * 10 - 10,
//         attributes: {
//             exclude: ["text"],
//         },
//         include: [
//             {
//                 model: models.User,
//                 attributes: ["name"],
//             },
//             {
//                 model: models.Tag,
//                 attributes: {
//                     exclude: ["createdAt", "updatedAt"],
//                 },
//                 through: {
//                     attributes: [],
//                 },
//             },
//         ],
//         order: sort,
//         limit: 3
//     });
//     const timeend = Date.now();

//     res.status(200).json({ time: timeend - time, poems: poems, length: poems.length });
//     // sequelize.close();
// }

