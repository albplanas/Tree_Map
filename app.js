
var url_movies =  "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json";
  


var w= 960; 
var h= 570;

var svg=d3.select("body").append("svg")
           .attr("width",w)
           .attr("height",h);

var color=d3.scaleOrdinal(d3.schemeCategory10);

    var tooltip = d3.select("body").append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);


var treemap = d3.treemap()
    .size([w, h])
    .paddingInner(0.5);

d3.json(url_movies , function(data){
  
  var root = d3.hierarchy(data)
      .sum((d)=> d.value)


  treemap(root);

  var cells=svg.selectAll(".cell")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr('class', 'cell');
  
  
   cells.append("rect")
      .attr("class", "tile")
      .attr("x",(d)=>d.x0)
      .attr("y",(d)=>d.y0)
      .attr("width",(d)=>d.x1 - d.x0)
      .attr("height", (d)=>d.y1 - d.y0)
      .attr("data-name", (d)=>d.data.name)
      .attr("data-category", (d)=>d.data.category)
      .attr("data-value", (d)=>d.data.value)
      .attr("fill",(d) =>color(d.data.category))
      .style("stroke", "gray")
      .on('mouseover', function(d, i) {
      
      d3.select(this).style("stroke", "black");
      
      tooltip.transition()
              .duration(100)
              .style('opacity', .9);
      tooltip.html("Category: "+this.getAttribute('data-category')+"<br>"+"Name: "+this.getAttribute("data-name")+"<br>"+"Value: "+this.getAttribute("data-value"))
              .attr("data-value", this.getAttribute("data-value"))
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 30) + "px")
              .style('transform', 'translateX(60px)');
    
    })
    .on('mouseout', function(d,i) {
    
      d3.select(this).style("stroke", "gray");
       tooltip.transition()
              .duration(100)
              .style('opacity', 0);
    });


    cells.append("text")
        .attr("x",(d)=>d.x0+1)
        .attr("y",(d)=>d.y0+15)
        .style("font-size",11)
        .attr("text-anchor","start")
        .text((d)=>d.children ? null :d.data.name.substring(0,8)+'...');
    
  



  Categories=["Action","Drama","Adventure","Family","Animation","Comedy","Biography"];
  var svg_leg=d3.select("body").append("svg")
           .attr("class","leg")
           .attr("width",250)
           .attr("height",250);
  
var legend = d3.select('.leg')
    .append("g")
    .selectAll("g")
    .data(Categories)
    .enter()
    .append('g')
      .attr('id', 'legend')
      .attr('transform',  'translate(40,40)');

 legend.append('rect')
    .attr("class","legend-item")
    .attr('width', 20)
    .attr('height', 20)
    .attr('x', 20)
    .attr('y', (d,i)=>i*30-7)
    .style('fill', (d)=>color(d))

legend.append('text')
    .attr('x', 60)
    .attr('y', (d,i)=>10+i*30)
    .text(function(d) { return d; });
});

