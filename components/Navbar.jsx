import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from "swr";
import { sanitize } from "./purify";


const fetcher = (url) => fetch(url).then((res) => res.json());

function Navbar() {
	const {data: session, error} = useSWR("/api/auth/session", fetcher);
	const {data: feed, error: feederror} = useSWR("/api/users/feed", fetcher, {
		initialData: {
			comments: []
		}
	});
	console.log(feed);
	const nav = (
	<>
		<ul className="menu menu-horizontal p-0 mx-1">
			<li><Link href="/">Home</Link></li>
		</ul>
		{session?.user ? (
		<ul className="menu menu-horizontal p-0 mx-1">
				<li><Link href="/submit">Submit</Link></li>
		</ul>
		) : <></>}
		{session?.user ? (
		<ul className="menu menu-horizontal p-0 mx-1">
				<li><Link href="/artifacts">Artifacts</Link></li>
		</ul>)
		: <></>}
		{session?.user ? (
		<ul className="menu menu-horizontal p-0 mx-1">
				<li><Link href="/tags">Tags</Link></li>
		</ul>)
		: <></>}
	</>
	)
    let loginInsert = <></>;
    if (!session) {
			loginInsert = (
				<></>
			);
    } else if (session) {
        if (session.user) {
            console.log("Feed", feed);
            loginInsert = (
                <>
									<div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar h-full" >
													
													<div className="indicator">
														{/*<span className="indicator-item badge badge-secondary">99+</span> */}

                            <div className="w-[30px]">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
    </path>
</svg>
                            </div>
														</div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-96 max-h-[60vh] overflow-y-scroll block" style={{display: "block"}}>
                            <h1 className="pl-4 pt-2 pb-2 text-xl">Comment Feed</h1>
													{feed?.comments ? feed.comments.map((ite ) => { return(
											<div key={ite.id} className="card card-compact w-full bg-base-100 shadow-xl mb-2">

		  <div className="card-body">
		    <h2 className="card-title">{ite.user.name} on &quot;{ite.poem.title}&quot;</h2>
		    <div dangerouslySetInnerHTML={{
						__html: sanitize(
								ite.text,
								{
										ADD_TAGS: [
												"iframe",
										],
								}
						),
												
				}} className="output"></div>
		    <div className="card-actions justify-end">
<Link href={"/artifacts/" + ite.poem.id}><span className="btn btn-primary">Open Artifact</span></Link>
		    </div>
		  </div>
</div>
													)}) : ""}

                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar h-full" >
                            <div className="w-10 rounded-full">
                                <img referrerPolicy="no-referrer" src={session.user.image} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <h1 className="pl-4 pt-2 pb-2 text-xl">Hi, {session.user.name}.</h1>
                            <li><Link href={"/users/" + session.pk}>Your Account</Link></li>
                            <li><a onClick={() => {signOut()}}>Logout</a></li>

                        </ul>
                    </div>
                </>
            );
        } else {
            loginInsert = (
                <button className="btn" onClick={() => {signIn()}}>Login</button>
            );
        }
    } else if (error) {
        loginInsert = (
            <>Error!</>
        )
    }
    return (
        <div className="navbar bg-primary text-primary-content backdrop-filter backdrop-blur-lg sticky top-0 z-10 bg-opacity-80 border-b border-gray-600 h-[59px]">
            <div className="navbar-start">
							<div className="dropdown">
      <label tabIndex="0" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-100y">
        {nav}
      </ul>
    </div>
							<Link href="/"><a className="btn btn-ghost normal-case text-xl">7C Artifacts</a></Link>

                
            
            <div className="navbar-center hidden lg:flex ">
           {nav}
            </div>
							</div>

            <div className="navbar-end">
            {loginInsert}
            </div>
        </div>
    );
}

export default Navbar;

// <li tabIndex={0}>
//             <a>
//               Parent
//               <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
//             </a>
//             <ul className="p-2 bg-neutral text-neutral-content">
//               <li><a>Submenu 1</a></li>
//               <li><a>Submenu 2</a></li>
//             </ul>
//           </li>
//           <li><a>Item 3</a></li>