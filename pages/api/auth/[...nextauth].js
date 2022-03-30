import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import SequelizeAdapter from "@next-auth/sequelize-adapter"
import { Sequelize } from "sequelize"

// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../maindb.db'
});

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
          return "/";
      } 
      // Filter down the data to this
      console.log('Signing in...')

      return true;
    }
  },
  
  adapter: SequelizeAdapter(sequelize),
  secret: process.env.NEXTAUTH_SECRET,
});

