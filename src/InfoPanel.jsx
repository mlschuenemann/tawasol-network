import React from "react";

// Dynamically import all images in assets/images
const images = import.meta.glob('/src/assets/images/*.{png,jpg,jpeg,webp}', { eager: true });

export default function InfoPanel({ node }) {
  if (!node) return null;

  // Normalize title and match image
  const matchingImage = Object.entries(images).find(([path]) => {
    const filename = path.split('/').pop().split('.')[0].toLowerCase();
    return filename === node.title.toLowerCase();
  });

  const logoSrc = matchingImage?.[1]?.default;

  return (
    <div
      id="info-content"
      className="space-y-6 text-sm text-gray-800 font-sans"
    >
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={`${node.title} logo`}
            className="w-16 h-16 rounded-full border border-gray-300 shadow-sm object-cover"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-900">{node.title}</h2>
      </div>

      {/* Info Fields */}
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
          <span>{node.engaged_towards?.join(", ") || "N/A"}</span>
        </div>
        <div className="flex">
          <span className="font-semibold w-40">🎭 Genre:</span>
          <span>{node.genre?.join(", ") || "N/A"}</span>
        </div>
        <div className="flex">
          <span className="font-semibold w-40">🌐 Resource Origin:</span>
          <span>{node.resource_origin || "N/A"}</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold mb-1">📝 Description:</p>
        <p className="text-gray-700">
          {node.description || "No description provided."}
        </p>
      </div>

      {/* Visit Website Button */}
      {node["web-links"] && (
        <a
          href={node["web-links"]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-full hover:bg-green-800 transition shadow"
        >

          Visit Website
        </a>
      )}
    </div>
  );
}
