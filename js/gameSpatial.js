var padPressedColor = "#ADC0ED";
var padColor = "#2B51A8";
var padShadedColor = "#0F368F";
var padIteration = [
    [3, 800, 3],
    [3, 500, 3],
    [3, 650, 4],
    [3, 650, 5],
    [4, 800, 5],
    [4, 650, 5],
    [4, 700, 6],
    [5, 580, 4],
    [5, 640, 5],
    [5, 780, 6]
];

var padPressed = new Set();
var padSequence;
var padSequenceColor = [];
var padScore;
var padGameTime;

var padSettingBlinks;
var padSettingTime;
var padSettingN;

function padInit(iter){
    padPressed = new Set();
    padSequence = [];
    padSequenceColor = [];
    padScore = [];
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

    var seq = getSequence();
    showSequence(seq);

    setTimeout(function() {
        d3.selectAll("#mainWindow").each(function() {d3.selectAll(this.childNodes).on("click", padHit).on("mouseover", padOver).on("mouseout", padOut);});
        backgroundNotify(colorStart);
        padSequence = seq;
        padGameTime = new Date().getTime();
    },padSettingTime*padSettingBlinks+500);

}
function showSequence(seq){
    var n = padSettingBlinks;
    var k = 0;
    var intervalID = setInterval(function() {
        n--;
        if (n == 0) clearInterval(intervalID);

        d3.select(seq[k]).transition().duration(50).style("opacity", 0.2).transition().duration(350).style("opacity", 1);
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
        padSequenceColor[k] = padColor;
    }
    return selectedPads;
}

function padHit(){
    if ("#pad"+this.id[3]+""+this.id[4] == padSequence[0]){
        d3.select(padSequence[0]).transition().duration(100).style("background-color", padPressedColor);

        var tmp = padSequence.splice(0,1);
        padPressed.add(tmp[0]);

        if (padSequence.length < 1) {
            backgroundNotify(colorCorrect);
            padScore = [padPressed.size, 1, (new Date().getTime()-padGameTime)/1000];

        }
    }
    else {
        backgroundNotify(colorIncorrect);
        padScore = [padPressed.size, padPressed.size/padSettingBlinks, (new Date().getTime()-padGameTime)/1000];

    }
}

function padOut() {
    if (!padPressed.has("#" + this.id))
        d3.select("#" + this.id).transition().style("background-color", padColor).duration(200);
    else
        d3.select("#" + this.id).transition().style("background-color", padPressedColor).duration(200);
}

function padOver() {
    if (!padPressed.has("#"+this.id))
        d3.select("#" + this.id).transition().style("background-color", padShadedColor).duration(200);
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
        'background-color:' + padColor + '"></div>';
}