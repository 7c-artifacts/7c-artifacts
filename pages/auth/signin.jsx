import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Home = (props) => {
  
  let router = useRouter();
  
  if (!router.query.callbackUrl) {
    router.query.callbackUrl = "/";
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card text-center hero-content w-50 bg-base-100 shadow-xl">
        <div className="card-body max-w-7xl">
          {router.query.error ? (
            <>
            <div className="alert alert-error shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>There was an error. Please try again in a bit. (Error code: <code>{router.query.error}</code>)</span>
                
              </div>
            </div>
            <br/>
            </>
          ) : ""}
          <h1 className="text-5xl font-bold">Sign in</h1>
          <p className="py-6">Please sign in to the 7C Poems site using your <b>SAS email</b>. Thanks!</p>

          <button className="btn btn-primary" onClick={() => signIn("google", {callbackUrl: router.query.callbackUrl})}>
            Sign in with Google
          </button>
          <br/>
        </div>
      </div>
    </div>
  );
};

              
  

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}



export default Home;