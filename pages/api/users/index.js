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
    let sort = req.query.sort;
    let query = req.query.query;
    if (sort == "new") sort = [['createdAt', 'DESC']];
    else if (sort == "old") sort = [['createdAt', 'ASC']];

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

    const users = await User.findAll({
        order: sort,
        distinct : true,
        limit: 12,
        subQuery: false,
        ...where
    });


    const timeend = Date.now();

    // let count = {total: 0, data: {}};
    // tags.count.forEach(coun => {
    //     count.total += coun.count;
    //     count.data[coun.id] = coun.count;
    // });
    // tags.count = count;

    res.status(200).json({ time: timeend - time, users: users });
    // sequelize.close();
}
