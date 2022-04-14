import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className="p-10 footer bg-neutral text-neutral-content">
        <div>

          <h4 className="text-xl font-bold">7C Poems</h4>
          <p>Displaying poems from 7C ELA students since 2022.</p>
          <p className="text-slate-400">This is made by Anvay Mathur, Dan<sub>iel</sub> He, Tim Xiang, (insert more names), and other anonymous contributors. Poems are written by students in 7C. Please note this website still in the testing phase. If bugs or typos are found, please email the developers.</p>
					<p className="text-slate-400">Please use the latest version of your browser if possible. This website works best on Chrome.</p>
          <p className="text-slate-500">Copyright © 2022 Anvay Mathur</p>
          <p className="text-slate-600">(come on, read the poems already!)</p>
        </div> 
        <div>
          <span className="footer-title">Contact</span> 
          <p>Email the developers: <a href="mailto:mathur47349@sas.edu.sg" className="link link-hover">mathur47349@sas.edu.sg</a></p>
          <p>Email Mrs. Powling: <a href="mailto:kpowling@sas.edu.sg" className="link link-hover">kpowling@sas.edu.sg</a></p>
        </div>
      </footer>
      
      
    </>
  );
}// here u can insert the code there. ill add it in the index file


export default Footer;