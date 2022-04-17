// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from 'next-auth/react';

const {models, sequelize} = require("../../models/models");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {text, title, tags, users} = req.body;
        const session = await getSession({ req });
        if (!session) {
            res.status(403).json({error: ["Incorrect account or not signed in"]});
            res.end();
            // sequelize.close();
            return;
        }
        if (!text || !title) {
            res.status(401).json({error: ["Missing text or title"]});
            res.end();
            // sequelize.close();
            return;
        }
        const Poem = models.Poem;
        const time = Date.now();
        const existingPoemsWithName = await Poem.findAll({
            attributes: ["title"],
            include: [models.User],
            ignoreIncludeAttributes: false,
            where: {
                '$users.id$': session.pk,
                title: title
            },
            // subQuery: false
        })

        if (existingPoemsWithName.length > 0) {
            res.status(401).json({error: ["Title already exists"]});
            res.end();
            // sequelize.close();
            return;
        }
        let error = [];
        
        



        const poem = Poem.build({
            text,
            title,
            // userId: session.pk
        })
        console.log("\tBuilt poem!")

        const user = await models.User.findByPk(session.pk);
        console.log(user);
        

        console.log("\tSet author!")
        let taglist = [];
        const tag = models.Tag;
        
        console.log("\tTags");
        for (let i = 0; i < tags.length; i++) {
            taglist.push(tag.findOrCreate({where: {name: tags[i].text}}));
        }
        try {
            taglist = await Promise.all(taglist);
        } catch(e) {

            error.push("Invalid tag");
            res.status(401).json({error});
            res.end();
            // sequelize.close();
            return;
        }
        taglist = taglist.map((v) =>{
            return v[0];
        });
        console.log(taglist);
        
        console.log("\tvalidate");
        try {
            await poem.validate();
        } catch (e) {

            e.errors.forEach((v, i) => {
                error.push(`Invalid field '${v.path}': ` + v.message);
            });
            res.status(401).json({error});
            res.end();
            // sequelize.close();
            return;
        }
        console.log("Get collaborators");
        let collab = [];
        for (let i = 0; i < users.length; i++) {
            collab.push(models.User.findByPk(users[i]));
        }
        try {
            collab = await Promise.all(collab);
        } catch(e) {
            error.push("Invalid user");
            res.status(401).json({error});
            res.end();
            return;
        }

        if (collab.indexOf(null) !== -1) {
            error.push("Invalid user");
            res.status(401).json({error});
            res.end();
            return;
        }

        console.log("Save")
        await poem.save()
        await poem.setTags(taglist);
        await poem.setUsers([user, ...collab]);
        
        const timeend = Date.now();

        res.status(200).json({ time: timeend - time, poem });
    }
    // sequelize.close();
}
