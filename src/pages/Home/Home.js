// src/components/Home.js
import React from "react";
import ReactECharts from "echarts-for-react";
import data from "../../data"; // Importing the local data
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const processData = () => {
    let chartData = [];
    data.sites.forEach((site) => {
      site.tanks.forEach((tank) => {
        tank.levels.forEach((level, index) => {
          if (!chartData[index]) {
            chartData[index] = { time: level.time, level: 0 };
          }
          chartData[index].level += level.level;
        });
      });
    });
    return chartData;
  };

  const getTotalTanks = () => {
    return data.sites.reduce((acc, site) => acc + site.tanks.length, 0);
  };

  const getTotalCapacity = () => {
    return data.sites.reduce(
      (acc, site) =>
        acc + site.tanks.reduce((tAcc, tank) => tAcc + tank.capacity, 0),
      0
    );
  };

  const getCurrentLPGLevel = () => {
    return data.sites.reduce(
      (acc, site) =>
        acc +
        site.tanks.reduce(
          (tAcc, tank) => tAcc + tank.levels[tank.levels.length - 1].level,
          0
        ),
      0
    );
  };

  return (
    <div className="home">
      <h1>Overall Tank Details</h1>
      <div className="summary-cards">
        <div className="card">
          <h2>Total Tanks</h2>
          <p>{getTotalTanks()}</p>
        </div>
        <div className="card">
          <h2>Total Capacity</h2>
          <p>{getTotalCapacity().toLocaleString()} L</p>
        </div>
        <div className="card">
          <h2>Current LPG Level</h2>
          <p>{getCurrentLPGLevel().toLocaleString()} L</p>
        </div>
      </div>
      <div className="charts">
        <ReactECharts
          option={{
            xAxis: {
              type: "category",
              data: processData().map((item) => item.time),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: processData().map((item) => item.level),
                type: "line",
                smooth: true,
                lineStyle: {
                  width: 4,
                },
              },
            ],
            tooltip: {
              trigger: "axis",
            },
          }}
          style={{ height: "400px", width: "100%" }}
        />
      </div>
      <div className="quick-actions">
        <button onClick={() => navigate("/reports")}>Generate Report</button>
        <button onClick={() => navigate("/sites")}>View Sites</button>
        <button onClick={() => navigate("/alerts")}>View Alerts</button>
      </div>
    </div>
  );
};

export default Home;
