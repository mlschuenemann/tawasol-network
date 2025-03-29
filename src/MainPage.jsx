import React, { useState } from "react";
import Network from "./Network";
import InfoPanel from "./InfoPanel";
import Statements from "./Statements";
import './index.css';

const MainPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [statementsData, setStatementsData] = useState([]);

  return (

    <div className="container mx-auto p-4">
      {/* Filters Section */}
      <div className="filters flex flex-wrap gap-4 justify-center">
        <select id="location-filter" className="border border-gray-300 rounded p-2">
          <option value="">All Locations</option>

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
        <select id="genre-filter" className="border border-gray-300 rounded p-2">
    <option value="">All Genres</option>
  </select>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Network Visualization */}
        <div className="md:col-span-2 bg-white mt-4">
          <Network
            onNodeSelect={setSelectedNode}
            setStatementsData={setStatementsData}
          />
        </div>

        {/* Info Panel */}
        <div id="info-panel" className="p-4 border border-gray-200 bg-white shadow-md">
          {selectedNode ? (
            <InfoPanel node={selectedNode} />
          ) : (
            <div id="info-content" className="text-gray-700">
              Click on a node in the network to see details here.
            </div>
          )}
        </div>
      </div>

      {/* Statements Section */}
      <div id="statements-container" className="mt-4 p-4 border border-gray-200 bg-white shadow-md">
      <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">
        Glossary of collective infrastructure
      </h3>
      <Statements title={selectedNode?.title} statements={statementsData} />

      </div>
    </div>
  );
};

export default MainPage;
