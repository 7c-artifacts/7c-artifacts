// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { models, sequelize } = require("../../../../models/models");
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.status(403).json({ error: ["Incorrect account or not signed in"] });
        res.end();
        // sequelize.close();
        return;
    }
    const Poem = models.Poem;
    const User = models.User;

    const time = Date.now();
    let user = await User.findByPk(req.query.user, {
        attributes: ["id"],
        include: [
            {
                model: Poem,
                attributes: { exclude: "text" },
                through: {
                    attributes: [],
                },
                include: [
                    {
                        model: models.Tag,
                        through: {
                            attributes: [],
                        },
                        attributes: ["id", "name"]
                    },
                    {
                      model: models.User,
                      through: {
                          attributes: [],
                      },
                      attributes: ["id", "name"]
                  },
                ],
            },
        ],
    });
    // let poems = await Poem.findAll({where: {"$users.id$": req.query.user}, attributes: {exclude: "text"}, include: [models.Tag, {model: models.User, attributes: ["name", "id"], through: {attributes: []}}], subQuery: true, group: ["poem.id"]});
    const timeend = Date.now();
    // poems = poems.map((ite) => {
    //   return {...ite, users: ite.users.map((ite2) => (ite2.name))}
    // })
    res.status(200).json({ time: timeend - time, poems: user.poems });
    // sequelize.close();
}
