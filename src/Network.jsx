import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Network() {
  const chartRef = useRef(null);
  const isLocal = false;
  const localURL = "/graph.json";
  const jsonURL =
    "https://mlschuenemann.github.io/tawasol-network/graph.json";
  let globalData;

  // Global filters state stored outside React state for now.
  const filters = {
    location: "",
    members: "",
    directed_to: "",
  };

  useEffect(() => {
    fetchData();

    const countrySelect = document.getElementById("country-filter");
    const sizeSelect = document.getElementById("size-filter");
    const engagedSelect = document.getElementById("engaged-towards-filter");
    const genreSelect = document.getElementById("genre-filter");

    countrySelect.addEventListener("change", onFilterChange);
    sizeSelect.addEventListener("change", onFilterChange);
    engagedSelect.addEventListener("change", onFilterChange);
    genreSelect.addEventListener("change", onFilterChange);

    return () => {
      countrySelect.removeEventListener("change", onFilterChange);
      sizeSelect.removeEventListener("change", onFilterChange);
      engagedSelect.removeEventListener("change", onFilterChange);
      genreSelect.removeEventListener("change", onFilterChange);
    };
  }, []);

  let globalStatementsData = {};

  async function fetchGlossaryData() {
    try {
      const response = await fetch("https://mlschuenemann.github.io/tawasol-network/glossary.json");
      globalStatementsData = await response.json();
    } catch (error) {
      console.error("Error fetching the glossary data:", error);
    }
  }

  useEffect(() => {
    fetchGlossaryData();
  }, []);

  function fetchStatementsForNode(nodeTitle) {
    return globalStatementsData.statements
      .filter(statement => statement.collective === nodeTitle)
      .map(statement => `<div class='statement-category'><strong>${statement.keyword}:</strong> ${statement.content}</div>`)
      .join("<br>") || "No statements available.";
  }


  async function fetchData() {
    try {
      const response = await fetch(isLocal ? localURL : jsonURL);
      const data = await response.json();
      globalData = data;
      populateFilters(data);
      updatePlugin(data, filters);
    } catch (error) {
      console.error("Error fetching the JSON file:", error);
    }
  }

  function populateFilters(data) {
    const countries = new Set();
    const sizes = new Set();
    const engagedTowards = new Set();
    const genres = new Set();

    data.nodes.forEach((node) => {
      if (node.location) countries.add(node.location);
      if (node.size) sizes.add(node.size);
      if (node.engaged_towards) node.engaged_towards.forEach(e => engagedTowards.add(e));
      if (node.genre) node.genre.forEach(g => genres.add(g));
    });

    const countrySelect = document.getElementById("country-filter");
    const sizeSelect = document.getElementById("size-filter");
    const engagedSelect = document.getElementById("engaged-towards-filter");
    const genreSelect = document.getElementById("genre-filter");

    countrySelect.innerHTML = `<option value="">All Countries</option>`;
    sizeSelect.innerHTML = `<option value="">All Sizes</option>`;
    engagedSelect.innerHTML = `<option value="">All Engaged Towards</option>`;
    genreSelect.innerHTML = `<option value="">All Genres</option>`;

    [...countries].sort().forEach((loc) => {
      countrySelect.add(new Option(loc, loc));
    });
    [...sizes].sort().forEach((size) => {
      sizeSelect.add(new Option(size, size));
    });
    [...engagedTowards].sort().forEach((engaged) => {
      engagedSelect.add(new Option(engaged, engaged));
    });
    [...genres].sort().forEach((genre) => {
      genreSelect.add(new Option(genre, genre));
    });
  }

  function onFilterChange(e) {
    const { id, value } = e.target;
    if (id === "country-filter") {
      filters.location = value;
    } else if (id === "size-filter") {
      filters.size = value;
    } else if (id === "engaged-towards-filter") {
      filters.engaged_towards = value;
    } else if (id === "genre-filter") {
      filters.genre = value;
    }
    updatePlugin(globalData, filters);
  }

  function updatePlugin(data, filters) {
    d3.select(chartRef.current).selectAll("svg").remove();

    const filteredNodes = data.nodes.filter((d) => {
      const matchLocation = filters.location ? d.location === filters.location : true;
      const matchSize = filters.size ? d.size === filters.size : true;
      const matchEngaged = filters.engaged_towards ? d.engaged_towards.includes(filters.engaged_towards) : true;
      const matchGenre = filters.genre ? d.genre.includes(filters.genre) : true;
      return matchLocation && matchSize && matchEngaged && matchGenre;
    });

    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = data.links.filter((l) => nodeIds.has(l.source) && nodeIds.has(l.target));

    const filteredData = { nodes: filteredNodes, links: filteredLinks };

    chart(filteredData);
  }

  function chart(data) {
    const width = 1908;
    const height = 1400;
    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(300)
      )
      .force("charge", d3.forceManyBody().strength(-3000))
      .force("collide", d3.forceCollide().radius((d) => (d.style?.radius || 10) + 10))
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05));

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const g = svg.append("g");

    svg.call(
      d3.zoom().scaleExtent([0.5, 10]).on("zoom", (event) => {
        g.attr("transform", event.transform);
      })
    );

    const link = g
      .append("g")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 5);

    const node = g
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => d.style?.radius || 10)
      .attr("fill", (d) => d.style?.color || "#888")
      .attr("stroke", (d) => d.style?.stroke_color || "#fff")
      .attr("stroke-width", (d) => d.style?.stroke_width || 1.5)
      .on("click", (event, d) => {
        if (d.web_links) {
          window.open(d.web_links, "_blank");
        }
        updateInfoPanel(d);
      });

    const labels = g
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("dy", (d) => d.style?.y_label || -12)
      .attr("text-anchor", "middle")
      .text((d) => d.title)
      .attr("font-size", (d) => d.style?.font_size || "10px")
      .attr("font-family", "sans-serif")
      .attr("font-weight", (d) => d.style?.font_weight || "normal")
      .attr("fill", (d) => d.style?.font_color || "black")
      .style("pointer-events", "none");

    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    // Mouse events for highlighting
    const originalColor = "#888";
    const originalStrokeColor = "#fff";
    const highlightColor = "#333";
    const grayColor = "lightgray";

    node.on("mouseover", (event, d) => {
      const connectedNodes = new Set();
      const connectedLinks = [];
      links.forEach((link) => {
        if (link.source.id === d.id) {
          connectedNodes.add(link.target.id);
          connectedLinks.push(link);
        } else if (link.target.id === d.id) {
          connectedNodes.add(link.source.id);
          connectedLinks.push(link);
        }
      });

      node
        .transition()
        .duration(200)
        .attr("fill", (n) =>
          connectedNodes.has(n.id) || n.id === d.id ? highlightColor : grayColor
        )
        .attr("stroke", (n) =>
          connectedNodes.has(n.id) || n.id === d.id ? "#fff" : grayColor
        )
        .attr("stroke-width", (n) =>
          connectedNodes.has(n.id) || n.id === d.id ? 2 : 1
        );

      labels.transition().duration(200).attr("fill", (n) => n.style?.font_color || "black");

      link
        .transition()
        .duration(200)
        .attr("stroke", (l) => (connectedLinks.includes(l) ? "black" : "#999"))
        .attr("stroke-width", (l) => (connectedLinks.includes(l) ? 3 : 5))
        .attr("stroke-opacity", (l) => (connectedLinks.includes(l) ? 1 : 0.2));
    });

    node.on("mouseout", (event, d) => {
      node
        .transition()
        .duration(200)
        .attr("fill", (n) => n.style?.color || originalColor)
        .attr("stroke", (n) => n.style?.stroke_color || originalStrokeColor)
        .attr("stroke-width", (n) => n.style?.stroke_width || 1.5);

      labels.transition().duration(200).attr("fill", (n) => n.style?.font_color || "black");

      link
        .transition()
        .duration(200)
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.2);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      const boundsWidth = 1900;
      const boundsHeight = 1620;
      event.subject.fx = Math.max(-boundsWidth / 2, Math.min(boundsWidth / 2, event.x));
      event.subject.fy = Math.max(-boundsHeight / 2, Math.min(boundsHeight / 2, event.y));
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }

  function updateInfoPanel(node) {
    const infoContent = document.getElementById("info-content");
    const statements = fetchStatementsForNode(node.title);
    infoContent.innerHTML = `
      <div class="info-title">${node.title}</div>
      <div class="info-field">
        <span class="info-label">Location:</span> ${node.location || "N/A"}
      </div>
      <div class="info-field">
        <span class="info-label">Size:</span> ${node.size || "N/A"}
      </div>
      <div class="info-field">
        <span class="info-label">Engaged Towards:</span> ${node.engaged_towards ? node.engaged_towards.join(", ") : "N/A"}
      </div>
      <div class="info-field">
        <span class="info-label">Genre:</span> ${node.genre ? node.genre.join(", ") : "N/A"}
      </div>
      <div class="info-field">
        <span class="info-label">Resource Origin:</span> ${node.resource_origin || "N/A"}
      </div>
      <div class="info-field">
        <span class="info-label">Description:</span>
        <p>${node.description || "No description provided."}</p>
      </div>
      <div class="info-field">
        <span class="info-label">Web Links:</span>
        ${node["web-links"] ? `<a href="${node["web-links"]}" target="_blank">${node["web-links"]}</a>` : "N/A"}
      </div>
      <div class="info-field">
        <span class="info-label">Statements:</span>
        <p>${statements}</p>
      </div>
    `;
  }


  return <div id="chart" ref={chartRef} className="border border-gray-200 bg-white shadow-md m-4" />;
}
