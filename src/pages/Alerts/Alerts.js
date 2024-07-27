// src/pages/Alerts.js
import React from "react";
import data from "../../data"; // Importing the local data
import "./Alerts.css";

const Alerts = () => {
  const alerts = [];

  // Process data to find alerts
  data.sites.forEach((site) => {
    site.tanks.forEach((tank) => {
      tank.levels.forEach((level) => {
        // Calculate percentage for each level
        const percentage = (level.level / tank.capacity) * 100;

        if (percentage < 25) {
          alerts.push({
            siteName: site.name,
            tankId: tank.tankId,
            level: percentage.toFixed(2),
            time: level.time,
          });
        }
      });
    });
  });

  return (
    <div className="alerts">
      <h1>Alerts</h1>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>
              <strong>Site:</strong> {alert.siteName} |{" "}
              <strong>Tank ID:</strong> {alert.tankId} | <strong>Level:</strong>{" "}
              {alert.level}% | <strong>Time:</strong> {alert.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts at this time.</p>
      )}
    </div>
  );
};

export default Alerts;
