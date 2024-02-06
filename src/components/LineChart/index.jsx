import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { getJsDateFromExcel } from 'excel-date-to-js';

const LineChart = ({ data, max, alert, title, treshold1, treshold2, tresholdText1, tresholdText2, rect }) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const svgWidth = 960;
    const svgHeight = 500;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    // Convertir les dates et calculer le pourcentage de changement
    data.forEach((d, i) => {
        if (i > 0) {
          d.percentageChange = ((d.crp - data[i - 1].crp) / data[i - 1].crp) * 100;
        }
      });

    // Création du SVG
    const svg = d3.select(ref.current)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    

    // Échelles
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width])
        .nice(); // Cette ligne arrondit les valeurs pour créer de l'espace

        const yScale = d3.scaleLinear()
        .domain([0, max]) // Définir le domaine de 0 à 5.5
        .range([height, 0]);

    // Ligne et points
    const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.crp))
        .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.crp))
      .attr('r', 5);

    // Lignes de seuil
    if (rect == true) {
      svg.append("rect")
      .attr("x", 0)
      .attr("width", width)
      .attr("y", yScale(treshold2))
      .attr("height", yScale(treshold1) - yScale(treshold2))
      .attr("fill", "green")
      .attr("opacity", 0.2);

    svg.append('text')
    .attr('x', 15)
    .attr('y', yScale(treshold2) + 20) // Positionner le texte au-dessus de la ligne de seuil
    .text(tresholdText1)
    .attr('font-size', '15px')
    .style('fill', 'green');
      
    } else if (rect == false) {

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', yScale(treshold1))
      .attr('y2', yScale(treshold1))
      .attr('stroke', 'orange');

    svg.append('text')
    .attr('x', 15)
    .attr('y', yScale(treshold1) - 10) // Positionner le texte au-dessus de la ligne de seuil
    .text(tresholdText1)
    .attr('font-size', '10px')
    .style('fill', 'orange');

    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', yScale(treshold2))
      .attr('y2', yScale(treshold2))
      .attr('stroke', 'red');

    svg.append('text')
    .attr('x', 15)
    .attr('y', yScale(treshold2) - 10) // Positionner le texte au-dessus de la ligne de seuil
    .text(tresholdText2)
    .attr('font-size', '10px')
    .style('fill', 'red');

    }
    data.forEach(d => {
    // Ajouter des points
    svg.append('circle')
        .attr('cx', xScale(d.date))
        .attr('cy', yScale(d.crp))
        .attr('r', 5);
    
    // Ajouter des labels de valeur au-dessus de chaque point
    svg.append('text')
        .attr('x', xScale(d.date))
        .attr('y', yScale(d.crp) - 10) // Positionner au-dessus du point
        .attr('text-anchor', 'middle') // Centrer le texte horizontalement
        .text(`${d.crp.toFixed(2)} ${d.unit}`) // Afficher la valeur arrondie
        .attr('font-size', '12px');
    });

    data.forEach(d => {
        // Ajouter des points
        svg.append('circle')
            .attr('cx', xScale(d.date))
            .attr('cy', yScale(d.crp))
            .attr('r', 5);
        
        // Ajouter des labels de date sous chaque point
        svg.append('text')
            .attr('x', xScale(d.date))
            .attr('y', height + margin.bottom / 2) // Positionner en bas, sous l'axe X
            .attr('text-anchor', 'middle') // Centrer le texte par rapport au point
            .text(getJsDateFromExcel(d.date)
            .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })) // Formater la date
            .attr('font-size', '10px');
          });
        
    
    // Label pour l'axe X
    svg.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
      .style("text-anchor", "middle")
      .text("Temps");
    
    // Axe Y
    svg.append("g")
      .call(d3.axisLeft(yScale));
    
    // Label pour l'axe Y
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(data.unit);
    // Texte pour le pourcentage de changement
    data.forEach((d, i) => {
      if (i > 0) {
        const midX = (xScale(d.date) + xScale(data[i - 1].date)) / 2;
        const midY = (yScale(d.crp) + yScale(data[i - 1].crp)) / 2;
    
        // Ajouter le texte du pourcentage
        svg.append('text')
          .attr('x', midX)
          .attr('y', midY)
          .text(d.percentageChange.toFixed(2) + '%');
    
        // Vérifier si le pourcentage est inférieur à -30%
        if (d.percentageChange < -30 && alert) {
          // Ajouter un cercle d'alerte
          svg.append('circle')
            .attr('cx', midX + 20) // Un peu à droite du texte
            .attr('cy', midY)
            .attr('r', 40)
            .attr('fill', 'none')  // Intérieur transparent
            .attr('stroke', 'red')
            .attr('stroke-width', 2); 
      
          // Ajouter le texte 'Alerte !'
          svg.append('text')
            .attr('x', midX + 20) // Aligner avec le cercle
            .attr('y', midY - 45) // Centrer verticalement dans le cercle
            .text('Alerte !')
            .attr('font-size', '10px')
            .attr('text-anchor', 'middle')
            .style('fill', 'red');
        }
      }
    });
    

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text(title);

  }, [data]);

  


  return (
    <svg ref={ref} width={600} height={400}></svg>
  );
};

export default LineChart;
