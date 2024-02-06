import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data , dimensions }) => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const { width, height } = dimensions;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    // Utiliser width et height pour calculer la taille et le positionnemen
    const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3.select(chartRef.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const allAxis = Object.keys(data[0]).slice(0, -1), 
          total = allAxis.length,
          angleSlice = Math.PI * 2 / total;

    const rScale = d3.scaleLinear()
                     .range([0, radius])
                     .domain([0, d3.max(data, d => d3.max(Object.keys(d).slice(0, -1), key => +d[key]))]);

    allAxis.forEach((d, i) => {
      svg.append("line")
         .attr("x1", 0)
         .attr("y1", 0)
         .attr("x2", rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
         .attr("y2", rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
         .attr("class", "line")
         .style("stroke", "black")
         .style("stroke-width", "1px");
    });

    allAxis.forEach((d, i) => {
        svg.append("text")
           .attr("class", "legend")
           .style("font-size", "12px")
           .attr("text-anchor", "middle")
           .attr("x", (radius + 20) * Math.cos(angleSlice * i - Math.PI / 2))
           .attr("y", (radius + 20) * Math.sin(angleSlice * i - Math.PI / 2))
           .text(d);
      });

    const radarLine = d3.lineRadial()
                        .radius(d => rScale(d[1]))
                        .angle((d, i) => i * angleSlice)
                        .curve(d3.curveLinearClosed);

    const radarWrapper = svg.selectAll(".radarWrapper")
                            .data(data)
                            .enter().append("g");

    radarWrapper.append("path")
    .attr("class", "radar")
    .attr("data", d => {
        const pathData = radarLine(Object.entries(d).slice(0, -1));
        console.log(d, pathData); // Log pour déboguer
        return pathData;
    })
    .style("fill", "steelblue")
    .style("fill-opacity", 0.1)
    .style("stroke", "steelblue")
    .style("stroke-width", 2);
  };

  return (
    <div ref={chartRef}></div>
  );
};

export default RadarChart;
