// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from 'next-auth/react';

const {models, sequelize} = require("../../../../models/models");

const commentsBlocked = false;
// UNBLOCK COMMENTS HERE ^^

export default async function handler(req, res) {
    if (req.method === 'POST') {
			
			
        const {text} = req.body;
        const session = await getSession({ req });
        if (!session) {
            res.status(403).json({error: ["Incorrect account or not signed in"]});
            res.end();
            // sequelize.close();
            return;
        }
			if (commentsBlocked && !(["kpowling@sas.edu.sg", "he47611@sas.edu.sg", "mathur47349@sas.edu.sg"].includes(session.user.email))) {
				res.status(403).json({error: ["The admins have decided to pause commenting for safety and well-being reasons for now. For any inquiries, please email the developers."]});
				res.end();
				return;
			}
        console.log("\t TEXT", text);
        if (!text) {
            res.status(401).json({error: ["Missing text"]});
            res.end();
            // sequelize.close();
            return;
        }
        const Comment = models.Comment;
        const time = Date.now();


        let error = [];
        
        const comment = Comment.build({
            text: text,
            userId: session.pk,
            poemId: req.query.poem
        })
        console.log("\tBuilt comment!")

        // const user = await models.User.findByPk(session.pk);
        // console.log(user);
        // await poem.setUser(user);
        
        try {
            await comment.validate();
        } catch (e) {

            e.errors.forEach((v, i) => {
                error.push(`Invalid field '${v.path}': ` + v.message);
            });
            res.status(401).json({error});
            res.end();
            // sequelize.close();
            return;
        }
        
        await comment.save()
        
        const timeend = Date.now();

        res.status(200).json({ time: timeend - time, comment });
    }
    // sequelize.close();
}
