var padIteration = [
    [3, 450, 4],
    [3, 400, 4],
    [3, 250, 5],
    [3, 200, 5],
    [4, 400, 4],
    [4, 350, 5],
    [4, 250, 5],
    [5, 450, 4],
    [5, 350, 5],
    [5, 350, 6]
];

var padPressed = new Set();
var padSequence;
var padSequenceColor = [];
var padGameTime;
var padSequenceIT = [];
var padSettingBlinks;
var padSettingTime;
var padSettingN;

function padInit(iter){
    padPressed = new Set();
    padSequence = [];
    padSequenceColor = [];
    padGameTime = 0;
    padSettingBlinks = padIteration[iter][2];
    padSettingTime = padIteration[iter][1];
    padSettingN = padIteration[iter][0];
}

function gameSpatial(iter){              // Main function
    padInit(iter);

    for (var i = 0; i < padSettingN; i++){
        for (var j = 0; j < padSettingN; j++){
            var pad = createPad(i, j);
            mainWindow.append(pad);
            d3.select("#pad"+i+""+j)
                .transition()
                .duration(100)
                .style("opacity", 1);
        }
    }

    padSequence = getSequence();
    setTimeout(showSequence, 300);

    padSequenceIT[1] = setTimeout(function() {
        d3.selectAll(".pad").on("click", padHit).on("mouseover", padOver).on("mouseout", padOut);
        backgroundNotify(colorStart);
        padGameTime = new Date().getTime();
    },padSettingTime*padSettingBlinks+600);

}
function showSequence(){
    var n = padSettingBlinks;
    var k = 0;
    padSequenceIT[0] = setInterval(function() {
        n--;
        if (n == 0) clearInterval(padSequenceIT[0]);

        d3.select(padSequence[k]).transition().duration(50).style("opacity", 0.2).transition().duration(350).style("opacity", 1);
        k++;
    }, padSettingTime);
}

function getSequence(){
    var selectedPads = [];
    var i, j;
    for (var k=0; k < padSettingBlinks; k++){
        do{
            i = Math.floor(Math.random() * padSettingN);
            j = Math.floor(Math.random() * padSettingN);
        }while (selectedPads.indexOf("#pad"+i+""+j) > -1);
        selectedPads[k] = "#pad"+i+""+j;
        padSequenceColor[k] = colorBlue;
    }
    return selectedPads;
}

function padHit(){
    if ("#pad"+this.id[3]+""+this.id[4] == padSequence[0]){
        d3.select(padSequence[0]).transition().duration(100).style("background-color", colorBlueLight);

        var tmp = padSequence.splice(0,1);
        padPressed.add(tmp[0]);

        if (padSequence.length < 1) {
            padWrapUp();
        }
    }
    else {
        padWrapUp();
    }
}
function padWrapUp(){
    if ( padPressed.size == padSettingBlinks ) backgroundNotify(colorCorrect);
    else backgroundNotify(colorIncorrect);
    setTimeout(function() {
        gameScore = [padPressed.size, padPressed.size / padSettingBlinks, (new Date().getTime() - padGameTime) / 1000];
        mainWindow.empty();
        waitGameEnd();
    }, 200);
}
function padOut() {
    if (!padPressed.has("#" + this.id))
        d3.select("#" + this.id).transition().style("background-color", colorBlue).duration(200);
    else
        d3.select("#" + this.id).transition().style("background-color", colorBlueLight).duration(200);
}

function padOver() {
    if (!padPressed.has("#"+this.id))
        d3.select("#" + this.id).transition().style("background-color", colorBlueDark).duration(200);
}

function createPad(i, j){
    var scalePads= 0.8;                 // Scale of pads
    var margin = 2;                     // Space between pads in %
    var factor = 100/padSettingN;
    var padSize = factor * scalePads;
    var frame = (100-(padSettingN*padSize + (padSettingN-1)*margin))/2;
    return '<div class="pad" id="pad'+ i +''+ j +'" style="' +
        'top:' + (frame+(margin*i)+(padSize*i)) +'%; ' +
        'left:' + (frame+(margin*j)+(padSize*j)) +'%; ' +
        'width:' + padSize +'%; ' +
        'height:' + padSize +'%; ' +
        'background-color:' + colorBlue + '"></div>';
}