import { signIn } from "next-auth/react";


function Restricted() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Sorry, but this page is restricted.</h1>
            <p className="py-6">Please sign in to be able to access this page.</p>
            <button className="btn btn-primary" onClick={() => {signIn()}}>Sign In</button>
          </div>
        </div>
      </div>
    </>
  );
}


export default Restricted;