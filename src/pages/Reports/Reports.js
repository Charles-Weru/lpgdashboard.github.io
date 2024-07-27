import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DatePicker, Select } from "antd";
import data from "../../data"; // Importing the local data
import "./Reports.css";
import "antd/dist/reset.css"; // Import Ant Design styles

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reports = () => {
  const sites = data.sites; // Use the data from data.js
  const [selectedSite, setSelectedSite] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [generatedReports, setGeneratedReports] = useState([]);

  const handleGenerateReport = () => {
    if (selectedSite) {
      const siteData = sites.find((site) => site.name === selectedSite);
      // Filter data based on date range
      const filteredTanks = siteData.tanks.map((tank) => ({
        ...tank,
        levels: tank.levels.filter((level) => {
          const levelDate = new Date(level.time);
          return (
            !dateRange ||
            (levelDate >= dateRange[0] && levelDate <= dateRange[1])
          );
        }),
      }));

      const xlsData = filteredTanks.map((tank) => ({
        TankID: tank.tankId,
        Capacity: tank.capacity,
        Levels: tank.levels
          .map((level) => `${level.time}: ${level.level}L`)
          .join(", "),
      }));

      const worksheet = XLSX.utils.json_to_sheet(xlsData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Save the current report
      const reportFileName = `${selectedSite}-report-${new Date().toISOString()}.xlsx`;
      saveAs(
        new Blob([excelBuffer], { type: "application/octet-stream" }),
        reportFileName
      );

      // Update generated reports list
      setGeneratedReports((prevReports) => [
        ...prevReports,
        { name: reportFileName, date: new Date().toLocaleString() },
      ]);
    }
  };

  return (
    <div className="reports">
      <h1>Reports</h1>
      <div className="report-controls">
        <Select
          placeholder="Select a site"
          onChange={(value) => setSelectedSite(value)}
          value={selectedSite || ""}
        >
          <Option value="" disabled>
            Select a site
          </Option>
          {sites.map((site, index) => (
            <Option key={index} value={site.name}>
              {site.name}
            </Option>
          ))}
        </Select>
        <RangePicker
          onChange={(dates) =>
            setDateRange(dates ? [dates[0].toDate(), dates[1].toDate()] : null)
          }
          style={{ margin: "10px 0" }}
        />
        <button onClick={handleGenerateReport} disabled={!selectedSite}>
          Generate Report
        </button>
      </div>
      <div className="generated-reports">
        <h2>Generated Reports</h2>
        {generatedReports.length > 0 ? (
          <ul>
            {generatedReports.map((report, index) => (
              <li key={index}>
                <a href={`path/to/reports/${report.name}`} download>
                  {report.name}
                </a>
                <span> - {report.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
