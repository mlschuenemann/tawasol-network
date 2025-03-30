import React from "react";
import logo from "/src/assets/images/logo_small.jpg"; // Adjust the path if needed

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white border-b shadow-sm px-6 py-4 mb-6">
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt="Tawasol Network Logo"
          className="h-12 w-12 object-contain rounded-full border border-gray-200"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tawasol Network</h1>
          <p className="text-sm text-gray-600">
            Mapping Collective Cultural Practice
          </p>
        </div>
      </div>
    </header>
  );
}
