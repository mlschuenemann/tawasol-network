import React from "react";

export default function Statements({ title, statements }) {
  // Group statements by keyword
  const groupedByKeyword = statements.reduce((acc, statement) => {
    const { keyword, collective, content } = statement;

    if (!acc[keyword]) {
      acc[keyword] = [];
    }

    // Only include if node is selected and matches, or if no node is selected
    if (!title || collective === title) {
      acc[keyword].push({ content, collective });
    }

    return acc;
  }, {});

  return (
    <div id="statements-container" className="space-y-6">
      {Object.entries(groupedByKeyword).map(([keyword, items]) => (
        <div key={keyword}>
          <h4 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
            {keyword}
          </h4>
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:bg-white"
                >
                  <p className="text-sm text-gray-700">
                    {title ? (
                      item.content
                    ) : (
                      <>
                        <span className="block text-gray-500 italic text-xs mb-1">
                          {item.collective}
                        </span>
                        {item.content}
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No statements for this keyword.</p>
          )}
        </div>
      ))}
    </div>
  );
}
