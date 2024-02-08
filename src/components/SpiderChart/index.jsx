import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data, dimensions, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const { width, height } = dimensions;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3.select(chartRef.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    if (data) {
    const allAxis = Object.keys(data[0]).filter(key => key !== 'player'), 
    total = allAxis.length,
    angleSlice = Math.PI * 2 / total;  

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Création d'un objet d'échelles
    const rScales = {};
    allAxis.forEach(axis => {
      rScales[axis] = d3.scaleLinear()
                        .range([0, radius])
                        .domain([0, d3.max(data, d => +d[axis])]);
    });
    
    svg.append("text")
     .attr("x", 0)
     .attr("y", 235)
     .attr("text-anchor", "middle")
     .style("font-size", "16px")
     .text(title);
    
    allAxis.forEach((axis, i) => {
      const axisScale = rScales[axis];
      const numGrades = 5;
      for(let j = 1; j <= numGrades; j++) {
        const value = axisScale.invert(radius * (j / numGrades));
        const x = (radius * (j / numGrades)) * Math.cos(angleSlice * i - Math.PI / 2);
        const y = (radius * (j / numGrades)) * Math.sin(angleSlice * i - Math.PI / 2);

        svg.append("text")
           .attr("x", x)
           .attr("y", y)
           .attr("dy", "0.35em")
           .style("font-size", "10px")
           .attr("text-anchor", i === total - 1 ? "start" : "middle")
           .text(Math.round(value));
      }

      // Code existant pour dessiner les lignes et textes des axes
    });

    // Ajout de lignes de graduation
    const numGrades = 5;
    for(let i = 0; i < numGrades; i++) {
      svg.append("circle")
         .attr("cx", 0)
         .attr("cy", 0)
         .attr("r", radius * ((i + 1) / numGrades))
         .style("fill", "none")
         .style("stroke", "lightgray")
         .style("stroke-dasharray", "2,2");
    }
    

    allAxis.forEach((axis, i) => {
      svg.append("line")
         .attr("x1", 0)
         .attr("y1", 0)
         .attr("x2", radius * Math.cos(angleSlice * i - Math.PI / 2))
         .attr("y2", radius * Math.sin(angleSlice * i - Math.PI / 2))
         .attr("class", "line")
         .style("stroke", "black")
         .style("stroke-width", "1px");

      svg.append("text")
         .attr("class", "legend")
         .style("font-size", "12px")
         .attr("text-anchor", "middle")
         .attr("x", (radius + 20) * Math.cos(angleSlice * i - Math.PI / 2))
         .attr("y", (radius + 20) * Math.sin(angleSlice * i - Math.PI / 2))
         .text(axis);
    });

    const radarLine = d3.lineRadial()
                        .radius(d => rScales[d.axis](d.value))
                        .angle((d, i) => i * angleSlice)
                        .curve(d3.curveLinearClosed);

    const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    data.forEach((datum, i) => {
      const radarData = allAxis.map(axis => ({ axis, value: datum[axis] }));
      
      svg.append("path")
         .attr("class", "radar")
         .attr("d", radarLine(radarData))
         .style("fill", "none")
         .style("stroke", colorScale(i)) 
         .style("stroke-width", 2)
         .on("mouseover", (event) => {
          tooltip.style("opacity", 1);
          tooltip.html(`Joueur : ${datum.player}`)
            .style("left", (event.pageX + 10) + "px") // 10px à droite de la souris
            .style("top", (event.pageY + 10) + "px"); // 10px sous la souris
        })
        .on("mousemove", (event) => {
          tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });
    });
  }
  };

  return (
    <div ref={chartRef}></div>
  );
};

export default RadarChart;
