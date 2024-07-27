import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reports from "./pages/Reports/Reports";
import Alerts from "./pages/Alerts/Alerts";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Sites from "./pages/Sites/Sites";
import SiteDetails from "./pages/siteDetails/SiteDetails";
import "./App.css";

function App() {
  return (
    <div className="APP">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/sites/:siteName" element={<SiteDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/alerts" element={<Alerts />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route component={<Error />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
