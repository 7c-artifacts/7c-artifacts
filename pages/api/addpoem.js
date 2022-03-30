// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Sequelize } from 'sequelize';
import models from "../../models/models";
import { getSession } from 'next-auth/react';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./maindb.db"
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {text, title, tags} = req.body;
        const session = await getSession({ req });
        if (!session) {
            res.status(403).json({error: ["Incorrect account or not signed in"]});
            res.end();
            return;
        }
        let error = [];
        
        const Poem = models.Poem;

        const time = Date.now();

        const poem = Poem.build({
            text,
            title
        })
        await poem.setAuthor(await Poem.findByPk(session.id));
        
        let taglist = [];
        const tag = models.Tag;
        await sequelize.sync();
        for (let i = 0; i < tags.length; i++) {
            taglist.push(tag.findOrCreate({where: {name: tags[i].name}}));
        }
        try {
            taglist = await Promise.all(taglist);
        } catch {
            error.push("Invalid tag");
            res.status(401).json({error});
            res.end();
            return;
        }
        
        poem.setTags(...tagslist);
        const valid = await poem.validate();
        Object.values(valid).forEach((v, i) => {
            error.push(`Invalid field '${i}': ` + v);
        });
        if (error.length > 0) {
            res.status(401).json({error});
            res.end();
            return;
        }
        await poem.save()
        
        const timeend = Date.now();

        res.status(200).json({ time: timeend - time, poem });
    }
}
