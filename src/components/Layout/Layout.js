// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Aside from "../Aside/Aside";
import data from "../../data"; // Importing the local data
import "./Layout.css";

const Layout = () => {
  // Assuming data.sites is an array containing the site data
  let alertCount = 0;

  data.sites.forEach((site) => {
    site.tanks.forEach((tank) => {
      // Check if any of the tank levels fall below 25% of the capacity
      tank.levels.forEach((level) => {
        const percentage = (level.level / tank.capacity) * 100;
        if (percentage < 25) {
          alertCount++;
          // Stop checking other levels for this tank if an alert has been found
          return;
        }
      });
    });
  });

  return (
    <div className="layout">
      <header className="header">
        <Navbar alertCount={alertCount} />
      </header>
      <div className="main-content">
        <aside className="aside">
          <Aside />
        </aside>
        <main className="content">
          <Outlet />
        </main>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
