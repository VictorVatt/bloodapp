import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getJsDateFromExcel } from 'excel-date-to-js';
const BulletChart = ({ data, rates, title, max }) => {
  const ref = useRef();

  useEffect(() => {
    if (data) {
      drawChart();
    }
  }, [data, rates]);

  const drawChart = () => {
    d3.select(ref.current).selectAll("*").remove();

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 575 - margin.left - margin.right;
    const height = 322 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([0, max])
      .range([0, width]);

      const yScale = d3.scaleBand()
      .domain(data.map(d => d.date)) // Utilisez les dates comme domaine
      .rangeRound([0, height])
      .padding(0.25); // Ajustez le padding ici pour modifier la hauteur des barres
    

    // Création du tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Dessin des seuils colorés avec tooltips
    rates.forEach((rate) => {
      svg.append('rect')
        .attr('x', xScale(rate.min))
        .attr('y', 0)
        .attr('width', xScale(rate.max) - xScale(rate.min))
        .attr('height', height)
        .attr('fill', rate.color)
        .on("mouseover", (event) => {
            tooltip.style("opacity", 1);
            tooltip.html(rate.name)
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

     // Supposons que vous avez une propriété nlr dans votre objet data

    data.forEach(data => {
    svg.append("rect")
        .attr("x", 0)  // La barre commence à gauche de l'axe des y
        .attr("y", yScale(data.date)) // Utilisez yScale pour positionner la barre sur l'axe des y
        .attr("width", xScale(data.nlr)) // La largeur de la barre est basée sur la valeur NLR
        .attr("height", yScale.bandwidth())
        .attr('rx', 5) // Rayon d'arrondi pour les coins horizontaux
        .attr('ry', 5) // Rayon d'arrondi pour les coins verticaux // Hauteur définie par la bande de l'échelle Y
        .attr("fill", "black")
        .attr('fill-opacity', 0.8)
        .on("mouseover", (event) => {
            tooltip.style("opacity", 1);
            tooltip.html(`Valeur : ${data.nlr.toFixed(2)}`)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY + 10) + "px");
          })
          .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY + 10) + "px");
          })
          .on("mouseout", () => {
            tooltip.style("opacity", 0);
          });;  // Opacité de 50%;
  
    // Ajoutez le label pour la date
    svg.append('text')
    .attr('x', xScale(data.nlr) + 20) // Position X du label à l'extrémité de la barre + 20px
    .attr('y', yScale(data.date) + yScale.bandwidth() / 2) 
    .attr('alignment-baseline', 'middle')
    .attr('dx', '-0.5em') // Décale légèrement le texte à gauche pour éviter de coller à la barre
    .text(getJsDateFromExcel(data.date)
    .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }))
    .attr('font-size', '14px');  // Affichez la date comme texte
    });


    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text(title);



    
  };

  return <svg ref={ref}></svg>;
};

export default BulletChart;