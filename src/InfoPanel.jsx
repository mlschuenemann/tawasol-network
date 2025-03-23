import React from "react";

export default function InfoPanel({ node }) {
  if (!node) return null;

  return (
    <div
      id="info-content"
      className="space-y-4 text-sm text-gray-800 font-sans"
    >
      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">
        {node.title}
      </h2>

      <div className="grid gap-2">
        <div className="flex">
          <span className="font-semibold w-40">📍 Location:</span>
          <span>{node.location || "N/A"}</span>
        </div>

        <div className="flex">
          <span className="font-semibold w-40">👥 Size:</span>
          <span>{node.size || "N/A"}</span>
        </div>

        <div className="flex">
          <span className="font-semibold w-40">➡️ Engaged Towards:</span>
          <span>
            {node.engaged_towards
              ? node.engaged_towards.join(", ")
              : "N/A"}
          </span>
        </div>

        <div className="flex">
          <span className="font-semibold w-40">🎭 Genre:</span>
          <span>{node.genre ? node.genre.join(", ") : "N/A"}</span>
        </div>

        <div className="flex">
          <span className="font-semibold w-40">🌐 Resource Origin:</span>
          <span>{node.resource_origin || "N/A"}</span>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-1">📝 Description:</p>
        <p className="text-gray-700">
          {node.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}
