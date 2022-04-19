import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  // Simple react landing page
  return (
    <div>
      <Head>
        <title>7C Artifacts</title>
      </Head>
      <Navbar />
      <div className="hero min-h-screen" style={{backgroundImage: "url(./img/headerImage.jpeg)"}}>
      
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to 7C Artifacts.</h1>
            <p className="mb-5">An Equitable and Interdependent Process Portfolio for our collective exploration of Equity and Interdependence</p>
            {/* <button className="btn btn-primary" onClick={() => {
              if (props.session) {
                poem();
              } else {
                signIn();
              }
            }}>{props.session ? "Submit a Poem" : "Sign up"}</button> */}
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-100">
        <div className="flex-col hero-content lg:flex-row">
          <img src="https://futuramo.com/blog/wp-content/uploads/2018/06/What_Motivates_People_to_Collaborate_with_Other_People.jpg" alt="Insert alt text here!" className="rounded-xl drop-shadow-xl hover:drop-shadow-2xl transition-all" style={{width: "50%"}} />
          <div className="ml-3">
            <h2 className="text-5xl font-bold">About 7C Artifacts</h2>
            <p className="py-6">This site is a place to share, explore, discuss, and cross-pollinate our ideas in pursuit of creating greater equity in our interdependent world, a way for us to play with ideas, experiment with possible solutions, and have conversations within and about, as Koh Buck Song puts it, &quot;the geometry of community.&quot;</p>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img src="https://blog.doist.com/wp-content/uploads/2020/07/HowToCreateGroupNorms_thumbnail.png" alt="Insert alt text here!" className="rounded-xl drop-shadow-xl hover:drop-shadow-2xl transition-all" style={{width: "50%"}} />
          <div className="mr-3"> 
            <h2 className="text-5xl font-bold">Norms</h2>
            <p className="py-6">The site’s effectiveness as a tool that makes learning <i><b>together</b></i> matter is highly dependent on the ways we use it. Therefore, the following are basic norms and expectations:
						<ol className="list-decimal list-inside mt-2" type={"1"}>
							<li>
							Submit artifacts that you have created.
							</li>
							<li>
							Submit artifacts that you have found and want to discuss or share with credit.</li>
							<li>Whatever artifact you submit, ALWAYS include:</li>
								<ol type={"a"} className="list-[lower-alpha] list-inside ml-3">
									<li>A short note explaining the link to equity and/or interdependence.</li>
									<li>A question to the community.</li>
								</ol>
							<li>Keep an open mind, and make an effort to learn from and teach one another generously and with dignity.</li>
							<li><b>Teachers are partners in your learning in this space, not evaluators or assessors.</b> We will add artifacts and respond to yours in the same ways as students. This is not a space for evaluative feedback and grading.
</li>
							<li>Do not spam or attempt to do malicious things on this website.</li>
						</ol>
						</p>
            
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-100">
			  <div className="hero-content text-center w-full">
			    <div className="w-full">
			      <h2 className="text-5xl font-bold">FAQ</h2>
			      <p className="py-6">These are some answers to questions that you might have.</p>
						<div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-full mb-2">
							<input type="checkbox" /> 
							<div className="collapse-title text-xl font-medium">
								What tags should I use?
							</div>
							<div className="collapse-content text-left"> 
								<p>Tags should come from 3 categories:
								<ul className="list-disc list-inside ml-2 my-3">
									<li>Concepts</li>
									<li>Topics</li>
									<li>Artifact descriptors</li>
								</ul>

								</p>
								<p className="mb-3">
								<b>Concepts</b> are timeless ideas, like equity, power, advocacy, compassion, identity. See <a target="_blank" rel="noreferrer noopener" href="https://docs.google.com/document/d/1e4zSesMOdqPv8v4OZcVz4PCj1LX-wBJ00F6UQx9Z88s/edit" className="link link-accent font-bold">here</a> for a list if you need help (not exclusive).
								</p>
								<p className="mb-3"><b>Topics</b> are tied to space and time. If you use a proper noun, it’s definitely a topic, not a concept. Topics could be Ukraine, school dress code, or three-toed sloth.</p>
								<p className="mb-3"><b>Descriptors</b> should tell us something about the type/form of the artifact: poem, argument, philosophical wondering, video, question, survey, website, song, short story, analysis of a text, and so on. Describe the item.</p>
								<p>Always consult with a learning partner about these, and if you’re still unsure, ask a teacher.</p>
								
							</div>
						</div>
						<div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-full mb-2">
							<input type="checkbox" /> 
							<div className="collapse-title text-xl font-medium">
								What does “Validation len on text failed” mean?
							</div>
							<div className="collapse-content text-left"> 
								This error means that your artifact or comment is too short or too long. Comments have a maximum and minimum length, but artifacts have no maximum but do have a minimum length. Please try to shorten or lengthen your artifact/comment. It should be clear whether you should shorten or lengthen.
							</div>
						</div>
						<div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-full mb-2">
							<input type="checkbox" /> 
							<div className="collapse-title text-xl font-medium">
								I am getting another error while submitting something that I don’t understand.
							</div>
							<div className="collapse-content text-left"> 
								Please email the developers (email at the footer) with the error message and what you were trying to post. We will usually reply quickly.
							</div>
						</div>
						<div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-full mb-2">
							<input type="checkbox" /> 
							<div className="collapse-title text-xl font-medium">
								I am getting a blank page with “Client side exception” when I go to a certain page.
							</div>
							<div className="collapse-content text-left"> 
								Please email the developers (email at the footer) with a screenshot of your JavaScript console open (CMD+OPT+J), what page it is happening on, and steps to reproduce the error.
							</div>
						</div>
						<div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-full mb-2">
							<input type="checkbox" /> 
							<div className="collapse-title text-xl font-medium">
								How can I delete or edit an artifact or comment?
							</div>
							<div className="collapse-content text-left"> 
At this moment of time, editing isn’t possible but if you want to delete your artifact or comment, please email the developers (email at the footer). This feature may be added later on, though.
							</div>
						</div>
						<div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-full mb-2">
							<input type="checkbox" /> 
							<div className="collapse-title text-xl font-medium">
								How can I ask another question about this website?
							</div>
							<div className="collapse-content text-left"> 
Please email the developers, which their email address is below in the footer.
							</div>
						</div>
						
			    </div>
					
			  </div>
			</div>
      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col hero-content text-center lg:flex-row-reverse w-full">
          <div className="w-full"> 
            <h2 className="text-5xl font-bold">Tutorial Video</h2>
            <div style={{position:'relative',paddingBottom:'56.25%',width:'100%'}} className="mt-4">
              <iframe style={{position:'absolute',inset:0,width:'100%',height:'100%'}} src="https://www.youtube-nocookie.com/embed/QhKm-kSoy9U" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
