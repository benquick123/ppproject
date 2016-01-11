var mode = 0;
var memoryMode = 0;
var gameRunning;
function loadGameplay() {
    gameRunning = $.Deferred();
    console.log("mode: " + mode + ", memoryMode: " + memoryMode);

    mainWindow.empty();

    /*
    return $.when(gameRunning).done(function(){
        console.log(padScore);
        mainWindow.empty();
    }).promise();
    */

    gameSpatial(3, 500, 6);
    
    countdown(3);
}
function handleGameplay(){
    game_spatial(3);
}

function countdown(seconds) {
    var cdown = '<div id="countdown">' + seconds + '</div>';
    mainWindow.append(cdown);

    var countdownText = $("#countdown");
    d3.select("#" + countdownText[0].id).transition().style("opacity", 0).duration(950);
    var intervalID = setInterval(function() {
        seconds--;
        if (seconds == 0) {
            clearInterval(intervalID);
            mainWindow.empty();
            handleGameplay();
        }
        countdownText[0].innerText = seconds;
        d3.select("#" + countdownText[0].id).style("opacity", 1);
        d3.select("#" + countdownText[0].id).transition().style("opacity", 0).duration(950);
    }, 1000);
}