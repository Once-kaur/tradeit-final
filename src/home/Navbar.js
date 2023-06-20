import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
          <div className="logo">Tradeit</div>
           <ul className="nav-links">
              {/* <Link to="/">profile</Link> */}
              <Link to="/upload">upload new product</Link>
              <Link to="/login">Login</Link>
              <Link to="/filelist">List</Link>

           </ul>
        </div>
  );

}