// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Models from "../../models/models";
import { getSession } from 'next-auth/react';
import sequelize from "../../components/client"

const models = Models(sequelize);
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {text, title, tags} = req.body;
        const session = await getSession({ req });
        if (!session) {
            res.status(403).json({error: ["Incorrect account or not signed in"]});
            res.end();
            return;
        }
        await sequelize.sync();
        let error = [];
        
        const Poem = models.Poem;

        const time = Date.now();

        const poem = Poem.build({
            text,
            title,
            userId: session.pk
        })
        console.log("\tBuilt poem!")

        // const user = await models.User.findByPk(session.pk);
        // console.log(user);
        // await poem.setUser(user);
        console.log("\tSet author!")
        let taglist = [];
        const tag = models.Tag;
        
        for (let i = 0; i < tags.length; i++) {
            taglist.push(tag.findOrCreate({where: {name: tags[i].text}}));
        }
        try {
            taglist = await Promise.all(taglist);
        } catch(e) {
            console.log(e);
            error.push("Invalid tag");
            res.status(401).json({error});
            res.end();
            return;
        }
        
        poem.setTags(taglist);
        try {
            const valid = await poem.validate();
        } catch (e) {
            Object.values(e).forEach((v, i) => {
                error.push(`Invalid field '${i}': ` + v);
            });
            res.status(401).json({error});
            res.end();
            return;
        }
        
        await poem.save()
        
        const timeend = Date.now();

        res.status(200).json({ time: timeend - time, poem });
    }
}
