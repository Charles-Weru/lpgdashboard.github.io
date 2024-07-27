import React from "react";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuAlertTriangle } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { LiaSitemapSolid } from "react-icons/lia";
import "./Aside.css";

const Aside = () => {
  return (
    <aside className="sidebar">
      <ul className="links">
        <li>
          <IoHomeOutline className="symbols" />
          <Link to="/">Home</Link>
        </li>
        <li>
          <LiaSitemapSolid className="symbols" />
          <Link to="/sites">Sites</Link>
        </li>
        <li>
          <HiOutlineDocumentReport className="symbols" />
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <LuAlertTriangle className="symbols" />
          <Link to="/alerts">Alerts</Link>
        </li>
        <li>
          <IoIosLogOut className="symbols" />
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
