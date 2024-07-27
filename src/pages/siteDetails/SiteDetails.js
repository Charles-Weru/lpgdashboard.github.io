// src/pages/SiteDetail/SiteDetail.js
import React from "react";
import { Link, useParams } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import data from "../../data"; // Importing the local data
import "./siteDetail.css";

const SiteDetail = () => {
  const { siteName } = useParams();

  // Use the data from data.js
  const sites = data.sites;
  const siteData = sites.find((site) => site.name === siteName);

  if (!siteData) return <p>Site not found</p>;

  const timePoints = [
    "6:00am",
    "7:00am",
    "8:00am",
    "9:00am",
    "10:00am",
    "11:00am",
    "12:00pm",
    "1:00pm",
    "2:00pm",
    "3:00pm",
    "4:00pm",
    "5:00pm",
    "6:00pm",
  ];

  const getLineChartOptions = (tank) => ({
    title: {
      text: `Stock Movement - Tank ${tank.tankId}`,
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: timePoints,
      name: "Time",
    },
    yAxis: {
      type: "value",
      name: "Litres",
    },
    series: [
      {
        name: `Tank ${tank.tankId}`,
        type: "line",
        data: tank.levels
          .filter((level) => timePoints.includes(level.time))
          .map((level) => level.level),
      },
      {
        name: `Tank ${tank.tankId}`,
        type: "bar",
        data: tank.levels
          .filter((level) => timePoints.includes(level.time))
          .map((level) => level.level),
      },
    ],
  });

  const getGaugeOptions = (tank) => {
    const latestLevel = tank.levels[tank.levels.length - 1].level;
    const percentage = (latestLevel / tank.capacity) * 100;

    return {
      title: {
        text: `Tank ${tank.tankId}`,
        left: "center",
        top: "top",
        textStyle: {
          fontSize: 18,
          color: "#333",
          fontWeight: "bold",
        },
      },
      series: [
        {
          name: `Tank ${tank.tankId}`,
          type: "gauge",
          center: ["50%", "50%"],
          radius: "70%",
          min: 0,
          max: 100,
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [
                  0.2,
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: "#ff4500" },
                    { offset: 1, color: "#ffec00" },
                  ]),
                ],
                [
                  0.8,
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: "#ffec00" },
                    { offset: 1, color: "#00ff00" },
                  ]),
                ],
                [1, "#00ff00"],
              ],
              width: 15,
              shadowColor: "#000",
              shadowBlur: 20,
            },
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: "auto",
              width: 2,
            },
            animationDuration: 1000,
            animationEasing: "elasticOut",
          },
          axisLabel: {
            color: "auto",
            fontSize: 14,
            fontWeight: "bold",
            animationDuration: 1000,
            animationEasing: "elasticOut",
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: (value) => {
                if (value < 25) return "#ff4500";
                if (value < 75) return "#ffec00";
                return "#00ff00";
              },
              animationDuration: 1000,
              animationEasing: "elasticOut",
            },
          },
          pointer: {
            width: 8,
            color: "auto",
            animationDuration: 2000,
            animationEasing: "elasticOut",
            shadowColor: "#000",
            shadowBlur: 15,
          },
          detail: {
            formatter: "{value}%",
            fontSize: 24,
            color: "auto",
            fontWeight: "bold",
            animationDuration: 1000,
            animationEasing: "elasticOut",
          },
          data: [{ value: percentage }],
          animationDuration: 2000,
          animationEasing: "elasticOut",
        },
      ],
    };
  };

  return (
    <div className="site-detail">
      <h1>{siteData.name}</h1>
      <div className="gauges">
        {siteData.tanks.map((tank, index) => (
          <div key={index} className="gauge-container">
            <ReactECharts
              option={getGaugeOptions(tank)}
              style={{ height: "400px", width: "400px" }}
            />
          </div>
        ))}
      </div>
      <div className="charts">
        {siteData.tanks.map((tank, index) => (
          <div key={index} className="chart-container">
            <ReactECharts
              option={getLineChartOptions(tank)}
              style={{ height: "400px", width: "500px" }}
            />
          </div>
        ))}
      </div>
      <div className="btn">
        <Link to={"/sites"}>Back</Link>
      </div>
    </div>
  );
};

export default SiteDetail;
