import React, { useState } from "react";
import Network from "./Network";
import InfoPanel from "./InfoPanel";
import Statements from "./Statements";
import Header from "./Header";
import "./index.css";

const MainPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [statementsData, setStatementsData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  return (

    <div className="container mx-auto p-4">
      <Header />
      {/* Filters Section */}

      <div className="my-4 w-full  mx-auto">
        {/* Toggle button (visible only on mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white transition-all hover:brightness-105 active:scale-95"
          style={{ backgroundColor: "rgb(92, 195, 94)", zIndex: 1000 }}
          aria-label="Toggle Filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
        </button>

        {/* Filters Container */}
        <div
          className={`bg-white shadow-md border border-gray-200 rounded-lg p-4 space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 ${
            showFilters ? "block" : "hidden"
          } sm:block`}
        >
          <select id="location-filter" className="filter-dropdown">
            <option value="">All Locations</option>
          </select>
          <select id="members-filter" className="filter-dropdown">
            <option value="">All Member Sizes</option>
          </select>
          <select id="directed-to-filter" className="filter-dropdown">
            <option value="">All Directed To</option>
          </select>
          <select id="genre-filter" className="filter-dropdown">
            <option value="">All Genres</option>
          </select>
          <button
            onClick={() => document.dispatchEvent(new Event("reset-filters"))}
            className="text-white px-4 py-2 rounded hover:opacity-90 transition"
            style={{ backgroundColor: "rgb(92, 195, 94)" }}
          >
            Reset Filters
          </button>
        </div>

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
        <div
          id="info-panel"
          className="p-4 border border-gray-200 bg-white shadow-md rounded-lg"
        >
          {selectedNode ? (
            <InfoPanel node={selectedNode} />
          ) : (
            <div id="info-content" className="text-gray-700">
              Click on a node in the network to see details here.
            </div>
          )}
        </div>
      </div>

      {/* Glossary Heading */}
      <div className="text-center mt-12 mb-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-medium text-gray-800 text-center mt-24">
          Glossary of Collective Infrastructure
        </h2>
        <p className="mt-1 text-md text-gray-600 mb-1">
          A shared vocabulary of concepts, practices, and resources shaping
          collective cultural work.
        </p>
      </div>

      {/* Button below the subtitle */}
      <div className="flex justify-center mb-12">
        <a
          href="http://info.collectivise.org/index.html" // <-- Replace this with your actual link
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-full shadow transition"
          style={{ backgroundColor: "rgb(92, 195, 94)" }}
        >
          Learn more <span className="text-lg">→</span>
        </a>
      </div>

      {/* Statements Section */}
      <div
        id="statements"
        className="p-4 border border-gray-200 bg-white shadow-md rounded-md max-w-5xl mx-auto"
      >
        <Statements title={selectedNode?.title} statements={statementsData} />
      </div>

      {/* Impressum Button at the Bottom */}
      <div className="mt-8 text-center">
        <a
          href="http://info.collectivise.org/impressum.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 underline hover:text-gray-800 transition"
        >
          Impressum
        </a>
      </div>

      {/* Scroll-to-Glossary Button */}
      <button
        onClick={() => {
          const el = document.getElementById("statements");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg text-white hover:opacity-90 transition"
        style={{ backgroundColor: "rgb(92, 195, 94)", zIndex: 1000 }}
        aria-label="Scroll to glossary"
      >
        ↓
      </button>
    </div>
  );
};

export default MainPage;
