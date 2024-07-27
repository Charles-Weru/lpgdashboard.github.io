// src/pages/Sites/Sites.js
import React from "react";
import { Link } from "react-router-dom";
import data from "../../data"; // Importing the local data
import "./Sites.css";

const Sites = () => {
  // Use the data from data.js
  const sites = data.sites;

  // Group sites by country and location
  const groupedSites = sites.reduce((acc, site) => {
    if (!acc[site.country]) {
      acc[site.country] = {};
    }
    if (!acc[site.country][site.location]) {
      acc[site.country][site.location] = [];
    }
    acc[site.country][site.location].push(site);
    return acc;
  }, {});

  return (
    <div className="sites">
      <h1>Sites</h1>
      {Object.entries(groupedSites).map(([country, locations]) => (
        <div key={country} className="country-group">
          <h2>{country}</h2>
          {Object.entries(locations).map(([location, sites]) => (
            <div key={location} className="location-group">
              <h3>{location}</h3>
              <ul>
                {sites.map((site) => (
                  <li key={site.name}>
                    <Link to={`/sites/${site.name}`}>{site.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sites;
