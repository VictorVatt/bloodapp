import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, normal, title, max, barColor, team }) => {
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
    const width = 575 - margin.left - margin.right;
    const height = 322 - margin.top - margin.bottom;


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
      .domain([0, max]); // Étendez l'échelle Y de 0 à 100

      svg.append("text")
      .attr("x", width / 2) 
      .attr("y", 0 + margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px") 
      .text(title);
       
      svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40) // Ajustez cette valeur pour positionner le label correctement
      .attr("x", -height / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .style("fill", "black") // Changez la couleur ici
      .text(`${name} (${unit})`); // Ajoutez le nom et l'unité ici

      svg.selectAll(".text")
      .data(data.slice(2))
      .enter().append("text")
      .attr("class", "label")
      .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
      .attr("y", d => y(d) - 5) // 5 pixels au-dessus de la barre
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text(d => d.toFixed(2));

    svg.selectAll(".bar")
    .data(values)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => x(i))
    .attr("width", x.bandwidth())
    .attr("y", height)
    .attr("rx", 5) // Arrondit les coins ici
    .attr("ry", 5) // Vous pouvez ajuster cette valeur pour changer le rayon de l'arrondi
    .transition()
    .duration(800)
    .attr("y", d => y(d))
    .attr("height", d => height - y(d))
    .attr("fill", barColor)


    svg.append("rect")
      .attr("x", 0)
      .attr("width", width)
      .attr("y", y(normal[1]))
      .attr("height", y(normal[0]) - y(normal[1]))
      .attr("fill", "green")
      .attr("opacity", 0.2);

    if (team) {
      svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(i => `Joueur : ${team[i]}`));
      const mean = d3.mean(data.slice(2));
      svg.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y(mean))
      .attr("y2", y(mean))
      .attr("stroke", "red")
      .attr("stroke-width", "2");// Format personnalisé pour les ticks

      svg.append("text")
      .attr("x", width) // Positionner à droite
      .attr("y", y(mean) - 5) // Un peu au-dessus de la ligne de moyenne
      .attr("text-anchor", "end") // Aligner le texte à la fin
      .style("font-size", "12px")
      .text(`Moyenne équipe : ${mean.toFixed(2)}`)
      .style('fill', 'red');
    } else {
      svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(i => `Prélèvement ${i + 1}`)); // Format personnalisé pour les ticks
    }
  };

  return (
    <svg ref={ref}/>
  );
};

export default BarChart;
