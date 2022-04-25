import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SequelizeAdapter from "@next-auth/sequelize-adapter"
const {models, sequelize} = require("../../../models/models");
// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database


// sequelize.sync();
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
    
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    async signIn(data) {
      if (data.profile.hd !== "sas.edu.sg") {
          return "/auth/signin?error=Not7CMember";
      } 
			console.log(data)
			if (/\d/g.test(data.user.email)) {
				return true
			} else {
				let teachers = [
					"lcameron@sas.edu.sg",
					"mmedina@sas.edu.sg",
					"zwang@sas.edu.sg",
					"rbuxton@sas.edu.sg",
					"rbruce@sas.edu.sg",
					"smccue@sas.edu.sg",
					"yzhang@sas.edu.sg",
					"aselley@sas.edu.sg",
					"brobertaccio@sas.edu.sg",
					"craymaakers@sas.edu.sg",
					"dgao@sas.edu.sg",
					"dfine@sas.edu.sg",
					"esparrow@sas.edu.sg",
					"kbucknall@sas.edu.sg",
					"kpowling@sas.edu.sg",
					"lmehrbach@sas.edu.sg",
					"sriley@sas.edu.sg",
					"bhall@sas.edu.sg",
					"lspillane@sas.edu.sg",
					"mtrainor@sas.edu.sg"
				]
				if (teachers.includes(data.user.email)) return true;
				return "/auth/signin?error=Not7CMember";
			}
      // Filter down the data to this


      return true;
    },
    async session({ session, token, user }) {
      // Get db primary key using user.email
      const userId = await models.User.findOne({ where: { email: user.email } });
      session.pk = userId.id;
      // session.user.image = "https://lh3.googleusercontent.com/a-/AOh14GiKSXn_dw6jzCX-JJV0HRF0vpi3uSQsm8X2ywCCYg=s50-c-k-no"
      return session;
    }
  },
  
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: models.User,
      Session: models.Session,
      VerificationToken: models.VerificationToken,
      Account: models.Account,
    },
    synchronize: false
  }),
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    jwt: true, 
    
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
});

