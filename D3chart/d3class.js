// Source: https://observablehq.com/@d3/chord-dependency-diagram
// Use this as inspiration. select the incoming & outgoing chords and pop them out:
// https://observablehq.com/@d3/hierarchical-edge-bundling

import * as d3 from 'd3'

class D3Class {
  containerEl
  props
  svg

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height } = props
    this.svg = d3.select(containerEl).append('svg').attr('id', 'd3Chord').attr('width', width).attr('height', height)

    this.updateDatapoints(props)
    console.log('CONSTRUCTED')
  }

  updateDatapoints = (props) => {
    console.log('Updating SVG')
    const svg = this.svg
    const { data, width, height, onDatapointClick, fontColor } = props

    const selection = d3.selectAll('svg#d3Chord > g')
    selection.remove().exit()

    this.chart(svg, width, height, data, onDatapointClick, fontColor)
  }

  setActiveDatapoint = (e, d) => {
    // d3.select(node).style('fill', 'yellow');
    this.props.onDatapointClick(e, d)
  }

  chart = (svg, width, height, inputdata, onDatapointClick, fontColor) => {
    console.log('🚀 ~ file: d3class.js ~ line 35 ~ D3Class ~ fontColor', fontColor)
    const rename = (name) => name.substring(name.indexOf('.') + 1, name.lastIndexOf('.'))

    const innerRadius = Math.min(width, height) * 0.5 - 90
    const outerRadius = innerRadius + 10

    const ribbon = d3
      .ribbonArrow()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius)

    const data = Array.from(
      d3
        .rollup(
          inputdata.flatMap(({ name: source, imports }) => imports.map((target) => [rename(source), rename(target)])),
          ({ 0: [source, target], length: value }) => ({ source, target, value }),
          (link) => link.join()
        )
        .values()
    )

    const names = Array.from(new Set(data.flatMap((d) => [d.source, d.target]))).sort(d3.ascending)

    function matrix() {
      const index = new Map(names.map((name, i) => [name, i]))
      const matrix = Array.from(index, () => new Array(names.length).fill(0))
      for (const { source, target, value } of data) matrix[index.get(source)][index.get(target)] += value
      return matrix
    }
    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))

    const chord = d3
      .chordDirected()
      .padAngle(10 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending)

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)

    const chords = chord(matrix())

    const g = svg.append('g').attr('transform', `translate(${width / 2},${width / 2})`)

    g.append('g')
      .attr('fill-opacity', 0.75)
      .selectAll('path')
      .data(chords)
      .join('path')
      .style('mix-blend-mode', 'multiply')
      .attr('fill', (d) => color(names[d.target.index]))
      .attr('d', ribbon)
      .on('mouseover', popout)
      .on('mouseout', popback)
      .append('title')
      .text((d) => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`)

    const group = g
      .append('g')
      .attr('font-size', 11)
      .attr('font-family', 'sans-serif')
      .selectAll('g')
      .data(chords.groups)
      .join('g')

    group
      .append('path')
      .attr('fill', (d) => color(names[d.index]))
      .on("mouseover", overed)
      .on("mouseout", outed)
      .attr('d', arc)


    group
      .append('text')
      .each((d) => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr('dy', '0.35em')
      .attr(
        'transform',
        (d) => `
        rotate(${(d.angle * 180) / Math.PI - 90})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? 'rotate(180)' : ''}
      `
      )
      .attr('text-anchor', (d) => (d.angle > Math.PI ? 'end' : null))
      .attr('fill', fontColor)
      .text((d) => names[d.index])
      .on("mouseover", overed)
      .on("mouseout", outed)

    group.append('title').text(
      (d) => `${names[d.index]}
        ${d3.sum(chords, (c) => (c.source.index === d.index) * c.source.value)} outgoing
        ${d3.sum(chords, (c) => (c.target.index === d.index) * c.source.value)} incoming`
    )

    function popout(event, d) {
      console.log("🚀 ~ file: d3class.js ~ line 127 ~ D3Class ~ readData ~ d", d)
      d3.select(this)
        .attr('fill-opacity', 1)
        .raise()
    }

    function popback(event, d) {
      d3.select(this)
        .attr('fill-opacity', .75)
        .raise()
    }

    function overed(event, d) {
      console.log("🚀 ~ file: d3class.js ~ line 127 ~ D3Class ~ overed ~ d", d)
      d3.select(this).attr('font-weight', 'bold')
    }

    function outed(event, d) {
      d3.select(this).attr('font-weight', null)
    }

    return svg
  }
}

export default D3Class
