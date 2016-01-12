var gameMode = 0;
var gameMemoryMode = 0;
var colorCorrect = "#4FCE5F";
var colorStart = "#393939";
var colorIncorrect = "#FF6A62";
var gameIterations = [0,0,0];
var gameScore;
var gameFunctions;

function loadGameplay() {                                               // Init global vars for gameplay.
    console.log("gameMode: " + gameMode + ", gameMemoryMode: " + gameMemoryMode);
    gameFunctions = [gameSpatial, gameNBack, gameRaw];
    gameFunctions = shuffleArray(gameFunctions);

    mainWindow.empty();
    countdown(3);
}

function waitGameEnd() {                                                // Check every x ms if game ended
    if(gameScore === null)
        setTimeout(waitGameEnd, 50);
    else {
        mainWindow.empty();
        console.log(gameScore);                                         // TODO something with score.

        if (gameMode == 0) {
            if (gameScore[1] == 1)
                gameIterations[gameMemoryMode]++;
            gameMemoryMode = (gameMemoryMode + 1) % 3;
        }
        else if (gameMode == 1) {

        }
        handleGameplay();                                               // Continue with games
    }
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

    waitGameEnd();
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

function backgroundNotify(color){
    d3.select("#mainWindow").transition().duration(30).style("background-color",color).transition().duration(300).style("background-color","white");
}