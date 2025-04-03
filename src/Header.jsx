import React from "react";
import logo from "/src/assets/images/logo_small.jpg"; // Adjust the path if needed

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white border-b shadow-sm px-6 py-4 mb-6"
    style={{ backgroundColor: "rgb(92, 195, 94)" }}>
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt="Network Logo"
          className="h-12 w-12 bg-white object-contain rounded-full border border-gray-200"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collectivise.org</h1>
          <p className="text-sm text-gray-600">
          Mapping Collective Cultural Practice
          </p>
        </div>
      </div>
    </header>
  );
}
