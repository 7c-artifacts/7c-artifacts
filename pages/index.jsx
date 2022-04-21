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
      <div className="hero h-screen max-h-screen" style={{marginTop:'-64px'}}>
        <div className="hero-overlay opacity-50 h-screen max-h-screen">
    <Image
      src="/img/headerImage.jpeg"
      alt="Writing with a pencil"
      layout="raw"
      width="3840"
      height="2560"
      className="h-screen max-h-screen object-cover"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAygAwAEAAAAAQAAAAgAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIAAgADAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAwMDBAMEBQUEBgYGBgYICAcHCAgNCQoJCgkNEwwODAwODBMRFBEPERQRHhgVFRgeIx0cHSMqJSUqNTI1RUVc/9sAQwECAwMDBAMEBQUEBgYGBgYICAcHCAgNCQoJCgkNEwwODAwODBMRFBEPERQRHhgVFRgeIx0cHSMqJSUqNTI1RUVc/9oADAMBAAIRAxEAAAGjeeS2l3//2gAIAQEAAQUCtLOzu7CXadqB/9oACAEDEQE/Acg3Hkv/2gAIAQIRAT8BxwiB4f/aAAgBAQAGPwK3VPPHliKgqBrThWvmxj7rw+D/AP/EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/ISGOPAzCvt7skuGZ73//2gAMAwEAAhEDEQAAEI//xAAzEQEBAQADAAECBQUBAQABAQkBABEhMRBBUWEgcfCRgaGx0cHh8TBAUGBwgJCgsMDQ4P/aAAgBAxEBPxBA144OuA+L/9oACAECEQE/EOKY3l/Nv//aAAgBAQABPxBphJAMrgxZzQFG5dZxjTMv/9k="
    />
        </div>
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to 7C Artifacts.</h1>
            <p className="mb-5">An Equitable and Interdependent Processfolio for our collective exploration of Equity and Interdependence</p>
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
      <div className="hero py-12 bg-base-100">
        <div className="flex-col hero-content lg:flex-row">
          <Image
      src="/img/about.jpeg"
      alt="Team holding hands"
      layout="raw"
      width={'5040'}
      height={'3360'}
      className="rounded-xl drop-shadow-xl hover:drop-shadow-2xl transition-all w-1/2 min-w-1/2 max-w-1/2"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAygAwAEAAAAAQAAAAgAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIAAgADAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAwMDBAMEBQUEBgYGBgYICAcHCAgNCQoJCgkNEwwODAwODBMRFBEPERQRHhgVFRgeIx0cHSMqJSUqNTI1RUVc/9sAQwECAwMDBAMEBQUEBgYGBgYICAcHCAgNCQoJCgkNEwwODAwODBMRFBEPERQRHhgVFRgeIx0cHSMqJSUqNTI1RUVc/9oADAMBAAIRAxEAAAGs4f6T9C5+3//aAAgBAQABBQIbVMoKtt+gP//aAAgBAxEBPwHqyc2S8hMiOOS//9oACAECEQE/AenJhHj188P/2gAIAQEABj8CI95X/J4JKgOAU+XFY9A4Uoa/F//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/Id9MT5lyDmX1lRw11+STy3//2gAMAwEAAhEDEQAAEA//xAAzEQEBAQADAAECBQUBAQABAQkBABEhMRBBUWEgcfCRgaGx0cHh8TBAUGBwgJCgsMDQ4P/aAAgBAxEBPxAYEMKLh/N//9oACAECEQE/EHLkcqxy5+V//9oACAEBAAE/EHYKIkbSU4FJIS2yCIAFrk2vIrt//9k="
    />
          <div className="ml-3">
            <h2 className="text-5xl font-bold">About 7C Artifacts</h2>
            <p className="py-6">This site is a place to share, explore, discuss, and cross-pollinate our ideas in pursuit of creating greater equity in our interdependent world, a way for us to play with ideas, experiment with possible solutions, and have conversations within and about, as Koh Buck Song puts it, &quot;the geometry of community.&quot;</p>
          </div>
        </div>
      </div>
      <div className="hero py-12 bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
    <Image
      src="/img/groupNorms.jpeg"
      alt="Team discussing"
      layout="raw"
      width={'4912'}
      height={'3264'}
      className="rounded-xl drop-shadow-xl hover:drop-shadow-2xl transition-all w-1/2 min-w-1/2 max-w-1/2"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAygAwAEAAAAAQAAAAgAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIAAgADAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAwMDBAMEBQUEBgYGBgYICAcHCAgNCQoJCgkNEwwODAwODBMRFBEPERQRHhgVFRgeIx0cHSMqJSUqNTI1RUVc/9sAQwECAwMDBAMEBQUEBgYGBgYICAcHCAgNCQoJCgkNEwwODAwODBMRFBEPERQRHhgVFRgeIx0cHSMqJSUqNTI1RUVc/9oADAMBAAIRAxEAAAHwPieJf9PF/9oACAEBAAEFArdW3GO5liRJ/9oACAEDEQE/AR02Ifn/AK7/AP/aAAgBAhEBPwH9Rk/N/9oACAEBAAY/AhnKEqpWn9TolOY9Q//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/IZG4V4Sxryd1OBgR/PT7v//aAAwDAQACEQMRAAAQX//EADMRAQEBAAMAAQIFBQEBAAEBCQEAESExEEFRYSBx8JGBobHRweHxMEBQYHCAkKCwwNDg/9oACAEDEQE/EENzl8av/9oACAECEQE/EFeMfsX/2gAIAQEAAT8QToAAo4i4PMOjWxkCsAfIx3f/2Q=="
    />
          <div className="mr-3"> 
            <h2 className="text-5xl font-bold">Norms</h2>
            <p className="py-6">The site can only help us learn interdependently if we use it effectively. So, the following are basic norms and expectations:
						<ol className="list-decimal mt-2 ml-8" type={"1"}>
              <li>Use the site in new and creative ways—in whatever ways we can imagine that will build our understanding of the concepts. <strong>Do not wait for teachers to direct students or give us permission.</strong> Teachers can catch up and learn how to support the new paths we pave. We are the leaders of learning here.</li>
              <li>Students and teachers are partners in learning in this space. Teachers may add artifacts and respond to others in the same ways as everyone else. They may help facilitate the ways students are interested in adapting the site’s use in new ways. Teachers may <strong>not</strong> give evaluative feedback or grades in this space, nor control/standardize/direct the ways students use the site, other than for students’ safety and wellbeing.
</li>
							<li>
							Submit artifacts that you have created.</li>
							<li>
							Submit artifacts that you have found and want to discuss or share with credit.</li>
							<li>Whatever artifact you submit, <strong>always</strong>:
								<ol type={"a"} className="list-[lower-alpha] ml-4">
									<li>Include a note making a connection to equity and/or interdependence.</li>
									<li>End with a question to the community.
</li>
                  <li>Be tagged with relevant concepts, topics, artifact descriptors</li>
								</ol></li>
							<li>Keep an open mind, and make an effort to learn from and teach one another generously and with dignity.</li>
							<li>NOTE: The editor should <em>never</em> be the first or only place you type content or comments. (We learned this the hard way and recommend drafting in a doc.)</li>
							<li>Do not spam or attempt to do malicious things on this website.</li>
						</ol>
						</p>
            
          </div>
        </div>
      </div>
      <div className="hero py-12 bg-base-100">
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
								<ul className="list-disc ml-8 my-3">
									<li>Concepts</li>
									<li>Topics</li>
									<li>Artifact descriptors</li>
								</ul>
								</p>
								<p className="mb-3">
								<strong>Concepts</strong> are timeless ideas, like equity, power, advocacy, compassion, identity. See <a target="_blank" rel="noreferrer noopener" href="https://docs.google.com/document/d/1e4zSesMOdqPv8v4OZcVz4PCj1LX-wBJ00F6UQx9Z88s/edit" className="link link-accent font-bold">here</a> for a list if you need help (not exclusive).
								</p>
								<p className="mb-3"><strong>Topics</strong> are tied to space and time. If you use a proper noun, it’s definitely a topic, not a concept. Topics could be Ukraine, school dress code, or three-toed sloth.</p>
								<p className="mb-3"><strong>Descriptors</strong> should tell us something about the type/form of the artifact: poem, argument, philosophical wondering, video, question, survey, website, song, short story, analysis of a text, and so on. Describe the item.</p>
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
You can delete an artifact by going to your user page and clicking “Delete artifact” on the poem you want to delete. Editing isn’t possible (and will not be possible). Your options are: 
<ol className="list-decimal ml-8 my-3">
  <li>Copy what you have in the artifact before deleting it, create a new one, and paste.</li>
  <li>If it&apos;s a complex artifact or embed, you can request an edit by emailing the developers (email in the footer).</li>
</ol>
							</div>
						</div>
            <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-full mb-2">
							<input type="checkbox" /> 
							<div className="collapse-title text-xl font-medium">
								What should a submission include?
							</div>
							<div className="collapse-content text-left"> 
<ul className="list-disc ml-8">
  <li>An artifact</li>
  <li>A statement of how it links to equity and interdependence</li>
  <li>A question you have for people to respond to in the comments</li>
</ul>
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
      <div className="hero py-12 bg-base-200">
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
