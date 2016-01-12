var shapeQueue = [];
var shapeNumber = 0;
var shapeLevel = 0;
var shapeIteration = [
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
    [8, 3]
];

var shapeGameTime;
var shapeTotalHit;

function gameNBack(n) {
    loadShapes();
    shapeLevel = n;
    shapeGameTime = 0;
    shapeTotalHit = 0;

    var topFrame = '<div id="nBackTopFrame"></div>';
    var bottomFrame = '<div id="nBackBottomFrame"></div>';
    mainWindow.append(topFrame);
    mainWindow.append(bottomFrame);

    var topFrame = $("#nBackTopFrame");
    var bottomFrame = $("#nBackBottomFrame");

    fillBottomFrame(bottomFrame);

    var total = shapeIteration[n-1][0] + shapeIteration[n-1][1];
    for (var i = 0; i < total; i++) {
        var shapeN = Math.floor(Math.random() * 8);
        shapeQueue[i] = $.parseHTML(shapes[shapeN]);
        shapeQueue[i][0].id = "bigShape" + i;
        shapeQueue[i][0].className = "currShape";
        shapeQueue[i][0].firstChild.id = "imgShape" + shapeN;
    }

    var title = '<div id="titleText" class="titleText" style="opacity:0;">◀ ' + shapeLevel + ' ◀</div>'
    topFrame.append(title);
    d3.select("#titleText").transition().style("opacity", 1).duration(1000);

    playShapes(topFrame);

}

function playShapes(topFrame) {
    if (shapeNumber < shapeQueue.length) {
        topFrame.append(shapeQueue[shapeNumber]);
        var newShape = d3.select("#bigShape" + shapeNumber);
        newShape.style("left", "3%");                                                     //KAO 25%
        newShape.select(".imageShape").transition().style("opacity", 1).duration(400);
        newShape.transition().style("left", "0%").duration(400);
    }

    if (shapeNumber > 0) {
        prevShape = shapeNumber - 1;
        var oldShape = d3.select("#bigShape" + prevShape);
        oldShape.select(".imageShape").transition().style("opacity", 0).duration(400);
        oldShape.transition().style("left", "-25%").duration(400);
        setTimeout(function() {
            $("#bigShape" + prevShape).remove();
        }, 450);
    }

    if (shapeNumber < shapeLevel) {
        setTimeout(function() {
            playShapes(topFrame);
        }, 2500);
    }

    if (shapeNumber == shapeQueue.length)
        wrapUp();

    shapeNumber++;
}

function wrapUp() {
    var totalHit = shapeTotalHit;
    var totalPercent = totalHit / (shapeQueue.length - shapeLevel);
    gameTime = [totalHit, totalPercent, (new Date().getTime() - shapeGameTime) / 1000];
    console.log(gameTime);

    d3.select("#titleText").transition().style("opacity", 0).duration(200);
    d3.select("#nBackBottomFrame").transition().style("opacity", 0).duration(200).each("end", function() {
        mainWindow.empty();
    });
}

function fillBottomFrame(bottomFrame) {
    var size = (100 - 7.5) / 8;

    for (var i = 0; i < 8; i++) {
        bottomFrame.append(shapes[i]);
        var shape = $("#shape")
        shape.css("width", size + "%").css("height", size + "%").css("left", 3.75 + i*size + "%");
        shape[0].id = "shape" + i;
        shape.on("click", onShapeClick);
        shape.on("mouseover", onShapeOver);
        shape.on("mouseout", onShapeOut);
    }

    d3.selectAll(".imageShape").transition().style("opacity", 1).duration(200);
}