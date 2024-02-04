import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (data && data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    // Extrait le nom, l'unité et les valeurs
    const name = data[0];
    const unit = data[1];
    const values = data.slice(2);

    // Nettoyer le SVG existant avant de redessiner
    d3.select(ref.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(values.map((_, i) => i)); // Utilisez l'index pour le domaine X

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100]); // Étendez l'échelle Y de 0 à 100

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(i => `Prélèvement ${i + 1}`)); // Format personnalisé pour les ticks

    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(`${name} (${unit})`);

    svg.selectAll(".bar")
      .data(values)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(i))
      .attr("width", x.bandwidth())
      .attr("y", height)
      .transition()
      .duration(800)
      .attr("y", d => y(d))
      .attr("height", d => height - y(d))
      .attr("fill", "red");

    svg.append("rect")
      .attr("x", 0)
      .attr("width", width)
      .attr("y", y(50))
      .attr("height", y(40) - y(50))
      .attr("fill", "green")
      .attr("opacity", 0.5);
  };

  return (
    <svg ref={ref}/>
  );
};

export default BarChart;
