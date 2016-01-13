var gameMode = 0;
var gameMemoryMode = 0;
var gameIterations = [0,0,0];
var eachGameScore = [0,0,0];
var gameScore;
var gameFunctions;
var gameCountdown;

var gameTimer, gameSeconds, totalGameTime;
var gameSumScore;

function loadGameplay() {                                               // Init global vars for gameplay.
    gameSumScore = 0;
    gameSeconds = 0;
    gameFunctions = [gameNBack, gameSpatial, gameRaw];
    gameFunctions = shuffleArray(gameFunctions);

    mainWindow.empty();
    gameSeconds = 0;
    totalGameTime = 5;
    gameCountdown = 1;
    loadGameInfo();

    countdown(gameCountdown);
}

function waitGameEnd() {                                                // Check every x ms if game ended
    mainWindow.empty();

    if (gameMode == 0) {
        if (gameScore[1] == 1)
            gameIterations[gameMemoryMode]++;

        tmpScore = ((gameIterations[gameMemoryMode]+1) * gameScore[1]) / (gameScore[2] / totalGameTime);
        console.log(tmpScore);

        switch(gameFunctions[gameMemoryMode].name) {
            case "gameRaw" :

                break;
            case "gameNBack" :
                break;
            case "gameSpatial" :
                break;
        }

        gameMemoryMode = (gameMemoryMode + 1) % 3;
        console.log(gameMemoryMode);
    }
    else if (gameMode == 1) {

    }
    gameScore = null;
    handleGameplay();                                               // Continue with games
}

function handleGameplay() {
    gameScore = null;                                                   // Set gameStore to null before game begins!

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

    //waitGameEnd();
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
    var tmpScore = 100;
    //console.log("End");

    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    mainWindow.append('<div class="data" id="score" style="' +
        'top:'  + 50 + '%; ' +
        'left:' + 50 + '%;' +
        'opacity:' + 0 + ';' +
        'width:' + 100 +'%; ' +
        'font-size:'+5+'vh;'+
        'height:' + 10 +'% ' +' ">'+
        "Točke: " +
        tmpScore +
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
}

function backgroundNotify(color){
    d3.select("#mainWindow").transition().duration(30).style("background-color",color).transition().duration(300).style("background-color","white");
}