var shapes = [];

function loadShapes() {
    var shapeNames = ["triangle1.svg", "triangle2.svg", "circle1.svg", "circle2.svg", "rectangle1.svg", "rectangle2.svg", "star1.svg", "star2.svg"];
    for (var i = 0; i < shapeNames.length; i++) {
        shapes[i] = '<div id="shape" class="imageShapeDiv">';
        shapes[i] += '<img class="imageShape" src="images/shapes/' + shapeNames[i] + '" style="opacity:0"/>';
        shapes[i] += '</div>';
    }

    shuffleArray(shapes);
}

function onShapeClick () {
    if (shapeNumber > shapeLevel && shapeNumber <= shapeQueue.length) {
        if (shapeGameTime == 0)
            shapeGameTime = new Date().getTime();

        cmpItem = shapeQueue[shapeNumber - shapeLevel - 1];

        var cmpNumber = cmpItem[0].firstChild.id.replace("imgShape", "");
        var currNumber = this.id.replace("shape", "");

        if (cmpNumber == currNumber) {
            backgroundNotify(colorCorrect);
            shapeTotalHit++;
            playShapes($("#nBackTopFrame"), false);
        }
        else {
            playShapes($("#nBackTopFrame"), true);
            backgroundNotify(colorIncorrect);
        }
    }
}

function onShapeOver () {
    var shapeName = this.firstChild.getAttribute("src").replace("images/shapes/", "").replace(".svg", "");
    var color = colorStart;
    if (shapeName == "circle2" || shapeName == "triangle2")
        color = "#FFA962";
    else if (shapeName == "circle1" || shapeName == "rectangle1")
        color = "#5271B7";
    else if (shapeName == "triangle1" || shapeName == "star2")
        color = "#FFCB62";
    else if (shapeName == "star1" || shapeName == "rectangle2")
        color = "#41A8A8";

    d3.select("#" + this.id).style("background-color", "white").transition().style("background-color", color).duration(200);
}

function onShapeOut () {
    d3.select("#" + this.id).transition().style("background-color", "transparent").duration(200);
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}