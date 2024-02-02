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
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Nettoie le SVG avant de redessiner

    const width = svg.attr('width');
    const height = svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Échelles
    const xScale = d3.scaleBand()
      .rangeRound([0, width - margin.left - margin.right])
      .padding(0.1)
      .domain(data.map(d => d.category));

    const yScale = d3.scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([0, d3.max(data, d => d.value)]);

    // Ajout des barres
    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.category))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - yScale(d.value));

    // Ajout des axes
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale));
  };

  return (
    <svg ref={ref} width={400} height={250} />
  );
};

export default BarChart;
