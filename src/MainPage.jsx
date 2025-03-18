import React from "react";
import Network from "./Network";
import './index.css';

const MainPage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Filters Section */}
      <div className="filters flex flex-wrap gap-4 justify-center">
        <select id="location-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Locations</option>
        </select>
        <select id="members-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Member Sizes</option>
        </select>
        <select id="directed-to-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Directed To</option>
        </select>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Network Visualization */}
        <div className="md:col-span-2 bg-white mt-18">
          <Network />
        </div>

        {/* Info Panel */}
        <div id="info-panel" className="p-4 border border-gray-200 bg-white shadow-md">

          <div id="info-content" className="text-gray-700">
            Click on a node in the network to see details here.
          </div>
        </div>
      </div>

      {/* Statements Section */}
      <div id="statements-container" className="mt-8 p-4 border border-gray-200 bg-white shadow-md">
        <h2 className="text-2xl font-bold">Statements</h2>
        <div id="statements-content" className="text-gray-700">
          Click on a node to see related statements here.
        </div>
      </div>
    </div>
  );
};

export default MainPage;
