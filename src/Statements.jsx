import React from "react";

export default function Statements({ title, statements }) {
  const nodeStatements = statements
    .filter((s) => s.collective === title)
    .map((s, i) => (
      <div
        key={i}
        className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:bg-white"
      >
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">{s.keyword}:</span>{" "}
          {s.content}
        </p>
      </div>
    ));

  return (
    <div id="statements-container" className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 border-b pb-2">
        Statements for {title}
      </h3>
      {nodeStatements.length > 0 ? (
        <div className="space-y-3">{nodeStatements}</div>
      ) : (
        <p className="text-gray-600">No statements available for this node.</p>
      )}
    </div>
  );
}
