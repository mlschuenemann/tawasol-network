import React from "react";
import Network from "./Network";
import './index.css';

const MainPage = () => {
  return (
    <>
      <div className="p-4 flex flex-wrap gap-4">
        <select id="country-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Countries</option>
        </select>

        <select id="engaged-towards-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Engaged Towards</option>
        </select>

        <select id="genre-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Genres</option>
        </select>

        <select id="size-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Sizes</option>
        </select>
      </div>

      <div id="container" className="flex flex-col md:flex-row">
        <Network />
        <div id="info-panel" className="w-full md:w-1/3 m-4 p-4 border border-gray-200 bg-white shadow-md">
          <div className="text-xl font-bold mb-2"></div>
          <div id="info-content" className="text-gray-700">
            Click on a node in the network to see details here.
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
