import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
//   console.log(props)
//   const loggedIn = props.session !== null;
//   console.log(loggedIn);
//   const image = props.session == null ? "" : props.session.user.image
  
//   let loginInsert = <></>;
//   if (!loggedIn) {
//     loginInsert = (
//       <button className="btn" onClick={() => {signIn}}>Login</button>
//     );
//   } else if (loggedIn) {
//     loginInsert = (
//       <>
//       <div className="dropdown dropdown-end">
//       <label tabIndex={0} className="btn btn-ghost btn-circle avatar" >
//         <div className="w-10 rounded-full">
//           <img src={image} />
//         </div>
//       </label>
//       <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
//         <h1 className="pl-4 pt-2 pb-2 text-xl">Hi, {props.session.user.name.split(" ")[0]}.</h1>
//         <li><a href={"/users/" + props.id}>Your Account</a></li>
//         <li><a onClick={() => {signOut}}>Logout</a></li>

//       </ul>
//       </div>
//       </>
//     );
//   }

    const session = useSession();
    let loginInsert = <></>;
    if (session.status == "loading") {
        loginInsert = (
            <>
                Loading...
            </>
        );
    } else {
        if (session.status == "authenticated") {
            loginInsert = (
                <>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar" >
                            <div className="w-10 rounded-full">
                                <img src={session.data.user.image} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <h1 className="pl-4 pt-2 pb-2 text-xl">Hi, {session.data.user.name.split(" ")[0]}.</h1>
                            <li><a href={"/users/" + session.data.user.id}>Your Account</a></li>
                            <li><a onClick={() => {signOut()}}>Logout</a></li>

                        </ul>
                    </div>
                </>
            );
        } else if (session.status == "unauthenticated") {
            loginInsert = (
                <button className="btn" onClick={() => {signIn()}}>Login</button>
            );
        }
    }
    return (
        <div className="navbar bg-primary text-primary-content backdrop-filter backdrop-blur-lg sticky top-0 z-10 bg-opacity-80 border-b border-gray-600">
            <div className="navbar-start">
                <Link href="/"><a className="btn btn-ghost normal-case text-xl">7C Poems</a></Link>
            </div>
            <div className="navbar-center flex">
            <ul className="menu menu-horizontal p-0">
                <li><Link href="/">Home</Link></li>
            </ul>
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