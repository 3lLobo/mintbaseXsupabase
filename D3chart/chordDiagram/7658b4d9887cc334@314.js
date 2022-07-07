// https://observablehq.com/@d3/chord-dependency-diagram@314
function _1(md){return(
md`# Chord Dependency Diagram

This [chord diagram](/@mbostock/d3-chord-diagram) shows dependencies among a software class hierarchy. Although it does not reveal class-level detail, as [hierarchical edge bundling](/@mbostock/d3-hierarchical-edge-bundling) does, it conveys the total number of imports between and within packages. Note, for example, that the *util* package does not import anything besides itself.`
)}

function _chart(d3,width,height,chord,matrix,color,names,arc,outerRadius,ribbon)
{
  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const chords = chord(matrix);

  const group = svg.append("g")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
    .selectAll("g")
    .data(chords.groups)
    .join("g");

  group.append("path")
      .attr("fill", d => color(names[d.index]))
      .attr("d", arc);

  group.append("text")
      .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => names[d.index]);

  group.append("title")
      .text(d => `${names[d.index]}
${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`);

  svg.append("g")
      .attr("fill-opacity", 0.75)
    .selectAll("path")
    .data(chords)
    .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("fill", d => color(names[d.target.index]))
      .attr("d", ribbon)
    .append("title")
      .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);

  return svg.node();
}


async function _data(d3,FileAttachment,rename){return(
Array.from(d3.rollup((await FileAttachment("flare.json").json())
  .flatMap(({name: source, imports}) => imports.map(target => [rename(source), rename(target)])),
  ({0: [source, target], length: value}) => ({source, target, value}), link => link.join())
  .values())
)}

function _rename(){return(
name => name.substring(name.indexOf(".") + 1, name.lastIndexOf("."))
)}

function _names(data,d3){return(
Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)
)}

function _matrix(names,data)
{
  const index = new Map(names.map((name, i) => [name, i]));
  const matrix = Array.from(index, () => new Array(names.length).fill(0));
  for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;
  return matrix;
}


function _chord(d3,innerRadius){return(
d3.chordDirected()
    .padAngle(10 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)
)}

function _arc(d3,innerRadius,outerRadius){return(
d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
)}

function _ribbon(d3,innerRadius){return(
d3.ribbonArrow()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius)
)}

function _color(d3,names){return(
d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))
)}

function _outerRadius(innerRadius){return(
innerRadius + 10
)}

function _innerRadius(width,height){return(
Math.min(width, height) * 0.5 - 90
)}

function _width(){return(
954
)}

function _height(width){return(
width
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["flare.json", {url: new URL("./files/9b6806e3dd9c4c2c26760ba784437138c78b43a9a8e58a0bbafe5833026e3265637c9c7810224d66b79ba907b4d0be731c1a81ad043e10376aec3c18a49f3d84", import.meta.url), mimeType: null, toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","width","height","chord","matrix","color","names","arc","outerRadius","ribbon"], _chart);
  main.variable(observer("data")).define("data", ["d3","FileAttachment","rename"], _data);
  main.variable(observer("rename")).define("rename", _rename);
  main.variable(observer("names")).define("names", ["data","d3"], _names);
  main.variable(observer("matrix")).define("matrix", ["names","data"], _matrix);
  main.variable(observer("chord")).define("chord", ["d3","innerRadius"], _chord);
  main.variable(observer("arc")).define("arc", ["d3","innerRadius","outerRadius"], _arc);
  main.variable(observer("ribbon")).define("ribbon", ["d3","innerRadius"], _ribbon);
  main.variable(observer("color")).define("color", ["d3","names"], _color);
  main.variable(observer("outerRadius")).define("outerRadius", ["innerRadius"], _outerRadius);
  main.variable(observer("innerRadius")).define("innerRadius", ["width","height"], _innerRadius);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
