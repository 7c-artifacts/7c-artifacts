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
			let students = [
				"madhava790579@sas.edu.sg",
				"liu47698@sas.edu.sg",
				"bretting48378@sas.edu.sg",
				"fowler787901@sas.edu.sg",
				"zheng47528@sas.edu.sg",
				"terami47503@sas.edu.sg",
				"kwon49628@sas.edu.sg",
				"chu768252@sas.edu.sg",
				"elflein780071@sas.edu.sg",
				"malhotra48814@sas.edu.sg",
				"devens44299@sas.edu.sg",
				"chu790931@sas.edu.sg",
				"kotecha47117@sas.edu.sg",
				"desai783823@sas.edu.sg",
				"flosi784707@sas.edu.sg",
				"krause49389@sas.edu.sg",
				"qureshi770043@sas.edu.sg",
				"sullivan779993@sas.edu.sg",
				"suttles779174@sas.edu.sg",
				"park44935@sas.edu.sg",
				"lee47754@sas.edu.sg",
				"ashraf44093@sas.edu.sg",
				"long786219@sas.edu.sg",
				"young776554@sas.edu.sg",
				"cho49711@sas.edu.sg",
				"narayanan772795@sas.edu.sg",
				"bhandari782697@sas.edu.sg",
				"antolihao791694@sas.edu.sg",
				"masuda771914@sas.edu.sg",
				"nath45719@sas.edu.sg",
				"lee789700@sas.edu.sg",
				"floro768412@sas.edu.sg",
				"lodhi43185@sas.edu.sg",
				"chadha788901@sas.edu.sg",
				"lim47443@sas.edu.sg",
				"karira771265@sas.edu.sg",
				"ye44627@sas.edu.sg",
				"oosthuizen777402@sas.edu.sg",
				"lee768401@sas.edu.sg",
				"chang774450@sas.edu.sg",
				"dalan46996@sas.edu.sg",
				"son45626@sas.edu.sg",
				"manaktala775826@sas.edu.sg",
				"park48303@sas.edu.sg",
				"lee773821@sas.edu.sg",
				"surendar48687@sas.edu.sg",
				"baisleybei48087@sas.edu.sg",
				"he47611@sas.edu.sg",
				"mundorff783408@sas.edu.sg",
				"motokura46677@sas.edu.sg",
				"mehta49868@sas.edu.sg",
				"toyama784011@sas.edu.sg",
				"capito44704@sas.edu.sg",
				"shin787890@sas.edu.sg",
				"kim784156@sas.edu.sg",
				"kittismidh44706@sas.edu.sg",
				"modi48775@sas.edu.sg",
				"mittal43628@sas.edu.sg",
				"sun783298@sas.edu.sg",
				"ghosh44944@sas.edu.sg",
				"shah778855@sas.edu.sg",
				"foy45466@sas.edu.sg",
				"mittal47269@sas.edu.sg",
				"macdonell49175@sas.edu.sg",
				"diebley44083@sas.edu.sg",
				"sung783314@sas.edu.sg",
				"teo49324@sas.edu.sg",
				"redick45373@sas.edu.sg",
				"talwar779784@sas.edu.sg",
				"zielinski44246@sas.edu.sg",
				"warner773167@sas.edu.sg",
				"wee48842@sas.edu.sg",
				"camez47819@sas.edu.sg",
				"wood46317@sas.edu.sg",
				"lee47733@sas.edu.sg",
				"bajaj47914@sas.edu.sg",
				"liu48279@sas.edu.sg",
				"zhang44182@sas.edu.sg",
				"gavankar789295@sas.edu.sg",
				"gaskell44278@sas.edu.sg",
				"fenianos775868@sas.edu.sg",
				"clarke44382@sas.edu.sg",
				"tan784735@sas.edu.sg",
				"hontz778968@sas.edu.sg",
				"mundorff783409@sas.edu.sg",
				"suttles779173@sas.edu.sg",
				"luke780441@sas.edu.sg",
				"mccarver786108@sas.edu.sg",
				"ng788943@sas.edu.sg",
				"gupta48394@sas.edu.sg",
				"cline774279@sas.edu.sg",
				"brevetta46413@sas.edu.sg",
				"lai770992@sas.edu.sg",
				"koltutsky43075@sas.edu.sg",
				"slaton48724@sas.edu.sg",
				"xiang47753@sas.edu.sg",
				"mathur47349@sas.edu.sg",
				"bai47532@sas.edu.sg",
				"kim49487@sas.edu.sg",
				"deo46589@sas.edu.sg",
				"dikov49525@sas.edu.sg",
				"yuan783676@sas.edu.sg",
				"kim47910@sas.edu.sg",
				"quinn48081@sas.edu.sg",
				"yuan790650@sas.edu.sg",
				"chakravart45641@sas.edu.sg",
				"boyd777161@sas.edu.sg",
				"niederberg48010@sas.edu.sg"
			];
			console.log(data)
			if (students.includes(data.user.email)) {
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

