import React from "react";
import Network from "./Network";

const MainPage = () => {
  return (
    <>
      <div className="p-4 flex flex-wrap gap-4">
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

      <div id="container" className="flex flex-col md:flex-row">
        <Network />
        <div id="info-panel" className="w-full md:w-1/3 m-4 p-4 border border-gray-200 bg-white shadow-md">
          <div className="text-xl font-bold mb-2">Select a Node</div>
          <div id="info-content" className="text-gray-700">
            Click on a node in the network to see details here.
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
