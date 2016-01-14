var gameMode = 0;
var gameMemoryMode = 0;
var gameIterations = [0,0,0];
var eachGameScore = [0.0,0.0,0.0];
var gameScore;
var gameFunctions;
var gameCountdown;

var gameTimer, gameSeconds, totalGameTime;
var gameSumScore;

var finalScore;

function loadGameplay() {                                               // Init global vars for gameplay.
    gameSumScore = 0;
    gameSeconds = 0;
    gameIterations = [0,0,0];
    eachGameScore = [0.0,0.0,0.0];
    gameFunctions = [gameNBack, gameSpatial, gameRaw];
    gameFunctions = shuffleArray(gameFunctions);

    mainWindow.empty();
    gameSeconds = 0;
    totalGameTime = 120;
    gameCountdown = 2;
    loadGameInfo();

    countdown(gameCountdown);
}

function waitGameEnd() {                                                // Check every x ms if game ended
    mainWindow.empty();

    if (gameMode == 0) {
        if (gameScore[1] == 1)
            gameIterations[gameMemoryMode]++;

        tmpScore = ((gameIterations[gameMemoryMode]+1) * gameScore[1]) / (gameScore[2] / totalGameTime);


        switch(gameFunctions[gameMemoryMode].name) {
            case "gameRaw" :
                eachGameScore[0] += tmpScore * 4;
                console.log("raw: " + tmpScore * 4);
                break;
            case "gameNBack" :
                eachGameScore[1] += tmpScore;
                console.log("nback: " + tmpScore);
                break;
            case "gameSpatial" :
                eachGameScore[2] += tmpScore;
                console.log("spatial: " + tmpScore);
                break;
        }

        gameMemoryMode = (gameMemoryMode + 1) % 3;
    }
    handleGameplay();                                               // Continue with games
}

function handleGameplay() {                                              // Set gameStore to null before game begins!

    if (gameMode == 0)
        gameFunctions[gameMemoryMode](gameIterations[gameMemoryMode]);
    else if (gameMode == 1) {
        switch(gameMemoryMode) {
            case 0 :
                gameRaw(gameIterations[gameMemoryMode]);
                break;
            case 1 :
                gameNBack(gameIterations[gameMemoryMode]);
                break;
            case 2 :
                gameSpatial(gameIterations[gameMemoryMode]);
        }
    }
}

function loadGameInfo() {
    var gameInfo = '<div class="gameInfo" style="opacity:0;"><span id="timeRemaining"></span></div>';
    $("body").append(gameInfo);
    if (gameMode == 0)
        $("#timeRemaining")[0].innerHTML = totalGameTime;

    var text = (gameMode == 1) ? "Končaj" : "Glavni meni";

    var button = '<div class="button" id="buttonBackToMenu" style="background-color:' + colorButton + '; height:70%; width:25%; top:50%; left:87.5%;">';
    button += '<span class="buttonText">' + text + '</span>';
    button += '</div>';
    $(".gameInfo").append(button);
    addEventListeners("buttonBackToMenu");
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
            d3.select(".gameInfo").transition().style("opacity", 1).duration(200);
            if (gameMode == 0) {
                gameTimer = setInterval(function() {
                    if (gameSeconds >= totalGameTime)
                        gameDisplayScore();
                    else {
                        gameSeconds++;
                        $("#timeRemaining")[0].innerHTML = totalGameTime - gameSeconds;
                    }
                }, 1000);
            }
        }
        countdownText[0].innerText = seconds;
        d3.select("#" + countdownText[0].id).style("opacity", 1);
        d3.select("#" + countdownText[0].id).transition().style("opacity", 0).duration(950);
    }, 1000);
}

function gameDisplayScore(){
    clearInterval(padSequenceIT[0]);
    clearTimeout(padSequenceIT[1]);
    clearInterval(gameTimer);
    mainWindow.empty();
    d3.select(".gameInfo").transition().style("opacity", 0).duration(200).each("end", function() {
        $(".gameInfo").remove();
    })
    finalScore = eachGameScore[0] + eachGameScore[1] + eachGameScore[2];

    document.cookie = "last="+eachGameScore[0]+","+eachGameScore[1]+","+eachGameScore[2];

    fileCallback = displayPercentageBest;
    loadFile();

    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    mainWindow.append('<div class="data" id="score" style="' +
        'top:'  + 50 + '%; ' +
        'left:' + 50 + '%;' +
        'opacity:' + 0 + ';' +
        'width:' + 100 +'%; ' +
        'font-size:'+5+'vh;'+
        'height:' + 10 +'% ' +' ">'+
        "Točke: " +
        Math.floor(finalScore) +
        '</div>')

    var buttonNames = ["Analiza", "Nazaj"];
    var buttonColor = colorButton;
    for (var i = 0; i < buttonNames.length; i++) {
        var position = 70 + i * 15;
        var button = createButton(buttonNames[i], buttonColor, position);
        mainWindow.append(button);
        d3.select("#button" + buttonNames[i].replace(" ", ""))
            .transition()
            .style("opacity", 1)
            .duration(1000)
            .each("end", function() {
                addEventListeners(this.id);
            });
    }
    d3.select("img#logo").transition().style("opacity", 1).duration(1000);
    d3.select("#score").transition().style("opacity", 1).duration(1000);

    setTimeout(function() {
        saveFile(eachGameScore[0], eachGameScore[1], eachGameScore[2], finalScore)
    }, 1000);
}

function displayPercentageBest(rawAvg, nBackAvg, padAvg, allTotalScores) {
    if (allTotalScores.length >= 5) {
        var percentage = 0;
        var i = 0;
        for (i = 0; i < allTotalScores.length; i++) {
            //console.log(finalScore + " vs. " + allTotalScores[i])
            if (finalScore < allTotalScores[i]) {
                percentage = i / (allTotalScores.length-1);
                break;
            }
        }
        if (i == allTotalScores.length)
            percentage = 1;

        percentageText = '<span id="percentageText">Boljši ste od ' + Math.floor(percentage*100) + '% ostalih igralcev.</span>';
        mainWindow.append(percentageText);
    }
}

function backgroundNotify(color){
    d3.select("#mainWindow").transition().duration(30).style("background-color",color).transition().duration(300).style("background-color","white");
}