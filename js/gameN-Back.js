var shapeQueue = [];
var shapeNumber = 0;
var shapeLevel = 0;
var shapeIteration = [
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 3],
    [3, 4],
    [3, 5],
    [4, 4],
    [4, 5],
    [5, 6],
    [6, 6]
];

var shapeGameTime;
var shapeTotalHit;
var shapeQueue;
var shapeNumber;

function gameNBack(n) {
    if (n >= shapeIteration.length)
        n = shapeIteration.length - 1;
    loadShapes();
    shapeNumber = 0;
    shapeLevel = n;
    shapeGameTime = 0;
    shapeTotalHit = 0;
    shapeQueue = [];

    var topFrame = '<div id="nBackTopFrame"></div>';
    var bottomFrame = '<div id="nBackBottomFrame"></div>';
    mainWindow.append(topFrame);
    mainWindow.append(bottomFrame);

    var topFrame = $("#nBackTopFrame");
    var bottomFrame = $("#nBackBottomFrame");

    fillBottomFrame(bottomFrame);

    var total = shapeIteration[n][0] + shapeIteration[n][1];
    for (var i = 0; i < total; i++) {
        var shapeN = Math.floor(Math.random() * 8);
        shapeQueue[i] = $.parseHTML(shapes[shapeN]);
        shapeQueue[i][0].id = "bigShape" + i;
        shapeQueue[i][0].className = "currShape";
        shapeQueue[i][0].firstChild.id = "imgShape" + shapeN;
    }

    var title = '<div id="titleText" class="titleText" style="opacity:0;">◀ ' + shapeIteration[shapeLevel][0] + ' ◀</div>'
    topFrame.append(title);
    d3.select("#titleText").transition().style("opacity", 1).duration(1000);

    playShapes(topFrame, false);

}

function playShapes(topFrame, end) {
    if (shapeNumber == shapeIteration[shapeLevel][0]) {
        backgroundNotify(colorStart);
        d3.select("#nBackBottomFrame").selectAll(".imageShape").transition().style("opacity", 1).duration(400).each("end", function() {
            d3.selectAll(".imageShapeDiv")
                .on("click", onShapeClick)
                .on("mouseover", onShapeOver)
                .on("mouseout", onShapeOut)
                .style("cursor", "pointer");
        });
    }

    if (shapeNumber < shapeQueue.length && !end) {
        topFrame.append(shapeQueue[shapeNumber]);
        var newShape = d3.select("#bigShape" + shapeNumber);
        newShape.style("left", "3%");                                                     //KAO 25%
        newShape.select(".imageShape").transition().style("opacity", 1).duration(400);
        newShape.transition().style("left", "0%").duration(400);
    }

    if (shapeNumber > 0 || end) {
        prevShape = shapeNumber - 1;
        var oldShape = d3.select("#bigShape" + prevShape);
        oldShape.select(".imageShape").transition().style("opacity", 0).duration(400);
        oldShape.transition().style("left", "-25%").duration(400);
        setTimeout(function() {
            $("#bigShape" + prevShape).remove();
            if (end) {
                wrapUp();
                //console.log("mistake");
            }

        }, 400);
    }

    if (shapeNumber < shapeIteration[shapeLevel][0]) {
        setTimeout(function() {
            playShapes(topFrame);
        }, 2000);
    }

    if (shapeNumber == shapeQueue.length) {
        //console.log("no elements left");
        wrapUp();
    }

    shapeNumber++;
}

function wrapUp() {
    var totalHit = shapeTotalHit;
    var totalPercent = totalHit / (shapeQueue.length - shapeIteration[shapeLevel][0]);
    gameScore = [totalHit, totalPercent, (new Date().getTime() - shapeGameTime) / 1000];
    //console.log(gameScore);

    d3.select("#titleText").transition().style("opacity", 0).duration(200);
    d3.select("#nBackBottomFrame").transition().style("opacity", 0).duration(200);
    setTimeout(function() {
        mainWindow.empty();
        gameScore = [totalHit, totalPercent, (new Date().getTime() - shapeGameTime) / 1000];
        waitGameEnd();
    }, 400);
}

function fillBottomFrame(bottomFrame) {
    var size = (100 - 7.5) / 8;

    for (var i = 0; i < 8; i++) {
        bottomFrame.append(shapes[i]);
        var shape = $("#shape")
        shape.css("width", size + "%").css("height", size + "%").css("left", 3.75 + i*size + "%").css("cursor", "default");
        shape[0].id = "shape" + i;
    }
}