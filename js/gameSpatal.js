var padPressedColor = "#ADC0ED";
var padColor = "#2B51A8";
var padShadedColor = "#0F368F";
var padPressed = new Set();
var padSequence;
var padSequenceColor = [];
var padScore;
var padGameTime;
var padBlinks;

function padInit(blinks){
    padPressed = new Set();
    padSequence = [];
    padSequenceColor = [];
    padScore = [];
    padGameTime = 0;
    padBlinks = blinks;
}

function gameSpatial(n,time, blinks ){              // Main function
    padInit(blinks);
    for (var i = 0; i < n; i++){
        for (var j = 0; j < n; j++){
            var pad = createPad(padColor, i, j, n);
            mainWindow.append(pad);
            d3.select("#pad"+i+""+j)
                .transition()
                .duration(100)
                .style("opacity", 1);
        }
    }

    var seq = getSequence(n,blinks);
    showSequence(seq, time, blinks);

    setTimeout(function() {
        d3.selectAll("#mainWindow").each(function() {d3.selectAll(this.childNodes).on("click", padHit).on("mouseover", padOver).on("mouseout", padOut);});

        padSequence = seq;
        padGameTime = new Date().getTime();
    },time*blinks+350);

}
function showSequence(seq, t, n){
    console.log("now2");
    var k = 0;
    var intervalID = setInterval(function() {
        n--;
        if (n == 0) clearInterval(intervalID);

        d3.select(seq[k]).transition().duration(50).style("opacity", 0.2).transition().duration(350).style("opacity", 1);
        k++;
    }, t);
}

function getSequence(n, blinks){
    var selectedPads = [];
    var i, j;
    for (var k=0; k<blinks; k++){
        do{
            i = Math.floor(Math.random() * n);
            j = Math.floor(Math.random() * n);
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
            d3.select("#mainWindow").transition().duration(30).style("background-color", "#4FCE5F").transition().duration(300).style("background-color", "white");
            padScore = [padPressed.size, 1, (new Date().getTime()-padGameTime)/1000];
            gameRunning.resolve();
        }
    }
    else {
        d3.select("#mainWindow").transition().duration(30).style("background-color","#FF6A62").transition().duration(300).style("background-color","white");
        padScore = [padPressed.size, padPressed.size/padBlinks, (new Date().getTime()-padGameTime)/1000];
        gameRunning.resolve();
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

function createPad(color, i, j, n){
    var scalePads= 0.8;                 // Scale of pads
    var margin = 2;                     // Space between pads in %
    var factor = 100/n;
    var padSize = factor * scalePads;
    var frame = (100-(n*padSize + (n-1)*margin))/2;
    return '<div class="pad" id="pad'+ i +''+ j +'" style="' +
        'top:' + (frame+(margin*i)+(padSize*i)) +'%; ' +
        'left:' + (frame+(margin*j)+(padSize*j)) +'%; ' +
        'width:' + padSize +'%; ' +
        'height:' + padSize +'%; ' +
        'background-color:' + color + '"></div>';
}