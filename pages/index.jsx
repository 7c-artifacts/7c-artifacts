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
        <title>7C Poems</title>
      </Head>
      <Navbar />
      <div className="hero min-h-screen" style={{backgroundImage: "url(./img/headerImage.jpeg)"}}>
      
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there, 7C students.</h1>
            <p className="mb-5">This is a website created to showcase your poems that you created!</p>
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
      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col hero-content lg:flex-row">
          <img src="/img/dummy/600x1000.png" alt="Insert alt text here!" className="rounded-xl drop-shadow-xl hover:drop-shadow-2xl transition-all" style={{height: "600px"}} />
          <div className="ml-3">
            <h1 className="text-5xl font-bold">Lorem Ipsum!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Lorem it!</button>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-400">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img src="/img/dummy/600x1000.png" alt="Insert alt text here!" className="rounded-xl drop-shadow-xl hover:drop-shadow-2xl transition-all" style={{height: "600px"}} />
          <div className="mr-3"> 
            <h1 className="text-5xl font-bold">Lorem Ipsum!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Lorem it!</button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
