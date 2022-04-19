import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className="p-10 footer bg-neutral text-neutral-content">
        <div>

          <h4 className="text-xl font-bold">7C Artifacts</h4>
          <p>Displaying artifacts (work) from 7C students since 2022.</p>
          <p className="text-slate-400">This is made by Anvay Mathur and Dan<sub>iel</sub> He. Artifacts are written or created by students in 7C. If bugs or typos are found, please email the developers.</p>
					<p className="text-slate-400">Please use the latest version of your browser if possible. This website works best on Chrome.</p>
          <p className="text-slate-500">Copyright © 2022 Anvay Mathur</p>
          <p className="text-slate-600">(come on, read the artifacts already!)</p>
        </div> 
        <div>
          <span className="footer-title">Contact</span> 
          <p>Email the developers and Mrs. Powling: <a href="mailto:7c-artifacts@googlegroups.com" className="link link-hover">7c-artifacts@googlegroups.com</a></p>
					<span className="footer-title mt-1">Sponsors</span> 
					<p>Alan Shen, 7A, CEO of Codesphere.org<br/>Special thanks to Alan for providing our database!</p>
        </div>
      </footer>
      
      
    </>
  );
}// here u can insert the code there. ill add it in the index file


export default Footer;