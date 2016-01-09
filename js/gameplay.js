var mode = 0;
var memoryMode = 0;

function loadGameplay() {
    console.log("mode: " + mode + ", memoryMode: " + memoryMode);

    mainWindow.empty();
    countdown(3)
}

function countdown(seconds) {
    cdown = '<div id="countdown">' + seconds + '</div>';
    mainWindow.append(cdown);

    countdownText = $("#countdown");
    d3.select("#" + countdownText[0].id).transition().style("opacity", 0).duration(950);
    var intervalID = setInterval(function() {
        seconds--;
        if (seconds == 0) {
            clearInterval(intervalID);
            mainWindow.empty();
        }
        countdownText[0].innerText = seconds;
        d3.select("#" + countdownText[0].id).style("opacity", 1);
        d3.select("#" + countdownText[0].id).transition().style("opacity", 0).duration(950);
    }, 1000);
}