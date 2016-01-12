
var rawIteration = [
    [3, 1, 3],
    [3, 1, 4],
    [3, 2, 3],
    [4, 1, 5],
    [4, 2, 3],
    [4, 2, 4],
    [4, 3, 2],
    [5, 1, 4],
    [5, 2, 3],
    [5, 3, 2]
];
var rawCurrentExample;
var rawExamples;
var rawData;
var rawGuessed;
var rawGameTime;

var rawSettingNumExamples;
var rawSettingDigit;
var rawSettingN;
var rawNumExamplesCounter;

function rawInit(iter){
    rawCurrentExample = null;
    rawGameTime = 0;
    rawExamples = new Set();
    rawData = new Set();
    rawGuessed = new Set();
    rawSettingNumExamples = rawIteration[iter][2];
    rawSettingDigit = rawIteration[iter][1];
    rawSettingN =  rawIteration[iter][0];
    rawNumExamplesCounter = 0;
}

function gameRaw(iter){              // Main function
    rawInit(iter);
    for (var i = 0; i < rawSettingN; i++){
        for (var j = 0; j < rawSettingN; j++){
            var data = createData(i, j);
            mainWindow.append(data);
        }
    }
    getExamples();
    mainWindow.append('<div class="button" id="buttonContinue" style="' +
        'top:'+86+'%;' +
        'opacity:'+0+';' +
        'background-color:'+colorCorrect+'' +
        '"></div>');
    d3.selectAll("#mainWindow").each(function() {d3.selectAll(this.childNodes).transition().duration(200).style("opacity",1).each("end",rawSetListeners);});
    rawGameTime = new Date().getTime();
}
function rawGetTime(){ rawGameTime = (new Date().getTime()-rawGameTime)/1000; rawCheckOut()}
function continueWithRawCheck(){
    var run = true;
    if (rawNumExamplesCounter == rawSettingNumExamples) { rawWrapUp(); run = false;}
    if (run){
        rawCurrentExample = Array.from(rawExamples)[Math.floor(Math.random() * rawExamples.size)];

        mainWindow.empty();
        mainWindow.append('<div class="button" id="buttonTrue" style="' +                   // Button True
            'left:' + 27.5 + '%;' +
            'width:' + 40 + '%;' +
            'top:' + 86 + '%;' +
            'opacity:' + 0 + ';' +
            'background-color:' + colorCorrect + '' +
            '"></div>');
        mainWindow.append('<div class="button" id="buttonFalse" style="' +                  // Button False
            'left:' + 72.5 + '%;' +
            'width:' + 40 + '%;' +
            'top:' + 86 + '%;' +
            'opacity:' + 0 + ';' +
            'background-color:' + colorIncorrect + '' +
            '"></div>');
        mainWindow.append('<div class="data" id="dataExample" style="' +                    // Example
            'height:' + 30 + '%;' +
            'width:' + 40 + '%;' +
            'top:' + 40 + '%;' +
            'left:' + 50 + '%;' +
            'border:' + 3 + 'vh ' + "solid" + ' ' + "#242525" + ';' +
            'border-radius:' + 5 + 'px;' +
            'opacity:' + 0 + '' +
            '">' +
            '<span class="buttonText" style="' +
            'font-size:' + 15 + 'vh' +
            '">' + rawCurrentExample + '</span>' +
            '</div>');
        d3.selectAll("#mainWindow").each(function() {d3.selectAll(this.childNodes).transition().duration(200).style("opacity",1).each("end",rawSetListeners);});
    }
}
function rawSetListeners(){
    if (this.id == "buttonFalse") d3.select("#buttonFalse").on("mouseover", onButtonRawOver).on("mouseout", onButtonRawOut).on("click", rawHit).transition().duration(200).style("opacity",1);
    else if (this.id == "buttonTrue") d3.select("#buttonTrue").on("mouseover", onButtonRawOver).on("mouseout", onButtonRawOut).on("click", rawHit).transition().duration(200).style("opacity",1);
    else if(this.id == "buttonContinue") d3.select("#buttonContinue").on("mouseover", onButtonRawOver).on("mouseout", onButtonRawOut).on("click", rawGetTime).transition().duration(200).style("opacity",1);
}
function getExamples(){
    var numPositives = Math.floor(Math.random() * Math.min(rawSettingNumExamples,rawData.size));        // Selecte number of elements already in rawData as positives
    var rawDataArray = Array.from(rawData);
    var tmp, i;
    for (i=0;i<numPositives;i++){                                                                   // Fill examples with some positives
        do {
            tmp = rawDataArray[Math.floor(Math.random() * rawDataArray.length)];
        }while(rawExamples.has(tmp));
        rawExamples.add(tmp);
    }
    for (i=rawExamples.size;i<rawSettingNumExamples;i++) {
        do {
            tmp = Math.floor(Math.random() * Math.pow(10, rawSettingDigit))
        } while (rawExamples.has(tmp)); // || rawData.has(tmp));   <--  if uncommented, number of positives will only be numPositives.
        rawExamples.add(tmp);
    }
}
function rawHit(){
    if ((this.id == "buttonFalse" && !rawData.has(rawCurrentExample)) || (this.id == "buttonTrue" && rawData.has(rawCurrentExample))){
        rawNumExamplesCounter++;
        rawExamples.delete(rawCurrentExample);
        rawCheckOut();
    }
    else rawWrapUp();
}
function rawCheckOut(){
    d3.selectAll("#mainWindow").each(function() {d3.selectAll(this.childNodes).transition().duration(200).style("opacity",0).each("end",continueWithRawCheck);});
}
function rawWrapUp(){
    if ( rawNumExamplesCounter == rawSettingNumExamples ) backgroundNotify(colorCorrect);
    else backgroundNotify(colorIncorrect);
    setTimeout(function(){

        gameScore = [rawNumExamplesCounter, rawNumExamplesCounter/rawSettingNumExamples,  rawGameTime ];
        mainWindow.empty();
    },200)
}

function onButtonRawOut() {
    if (this.id == "buttonFalse")   d3.select("#" + this.id).transition().style("background-color", colorIncorrect).duration(200);
    else                            d3.select("#" + this.id).transition().style("background-color", colorCorrect).duration(200);
}

function onButtonRawOver() {
    if (this.id == "buttonFalse")   d3.select("#" + this.id).transition().style("background-color", "#E23E35").duration(200);
    else                            d3.select("#" + this.id).transition().style("background-color", "#2BBA3D").duration(200);
}
function createData(i, j){
    var data = Math.floor(Math.random() * 10 * rawSettingDigit);
    rawData.add(data);
    var factorX = 100/(rawSettingN+1);
    var factorY = 80/(rawSettingN+1);
    return '<div class="data" id="data'+ i +''+ j +'" style="' +
        'top:'  +(factorY+(factorY*i)) +'%; ' +
        'left:' +(factorX+(factorX*j)) +'%;' +
        'opacity:'+0+';' +
        'width:' + 20 +'%; ' +
        'height:' + 10 +'%; ' +' ">' +
        data
        + '</div>';
}