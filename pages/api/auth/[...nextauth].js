import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import sequelize from "../../../components/client"
import Models from "../../../models/models"
// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database

const models = Models(sequelize);

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
          return "/auth/signin";
      } 
      // Filter down the data to this
      console.log('Signing in...')

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
    synchronize: true
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

