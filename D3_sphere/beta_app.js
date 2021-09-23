//set size for svg
var main = function (points) {
    var width = 1400,
        height = 800,
        //rotate = [10, -10],
        time = Date.now();
//declare type of shape
    var sphere = {
        type: "Sphere"
    };
// adjust axis of rotation in output
    const config = {
        speed: 0.005,
        verticalTilt: -8,
        horizontalTilt: 0
    }
    enableRotation();
    
    var graticule = d3.geo.graticule();

    var projection = d3.geo.orthographic()
        .scale(250)
        .translate([width / 2, height / 2])
        .clipAngle(90);

    var path = d3.geo.path()
        .projection(projection);

    var cx = d3.scale.linear()
        .domain([0, width])
        .range([-180, 180]);

    var cy = d3.scale.linear()
        .domain([0, height])
        .range([90, -90]);

    var drag = d3.behavior.drag().origin(function () {
        var r = projection.rotate();
        return {
            x: cx.invert(r[0]),
            y: cy.invert(r[1])
        };
    })
        .on("drag", function () {
            projection.rotate([cx(d3.event.x), cy(d3.event.y)]);
            svg.selectAll("path.graticule").attr("d", path);
        });

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

    svg.call(drag);
    function enableRotation() {
        d3.timer(function (elapsed) {
            projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
            svg.selectAll("path").attr("d", path);
        });
    }        

} //end Main

main();

