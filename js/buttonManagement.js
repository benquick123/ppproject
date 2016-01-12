function onButtonClick() {
    //console.log(mainWindow.children());
    var call = null;
    if (this.id == "buttonIgraj") {
        call = loadGameplay;
        gameMode = 0;
    }
    else if (this.id == "buttonVadi")
        call = loadPractice;
    else if (this.id == "buttonAnaliza")
        call = loadAnalysis;
    else if (this.id == "buttonNavodila")
        call = loadInstructions;
    else if (this.id == "buttonLestvicarezultatov")
        call = loadHighscore;
    else if (this.id == "buttonNazaj")
        call = loadMainMenu;
    else if (this.id == "buttonPomnenjegolihpodatkov") {
        call = loadGameplay;
        gameMode = 1;
        gameMemoryMode = 0;
        gameIterations[gameMemoryMode] = selectedLevel-1;
    }
    else if (this.id == "buttonDelovnispomin") {
        call = loadGameplay;
        gameMode = 1;
        gameMemoryMode = 1;
        gameIterations[gameMemoryMode] = selectedLevel-1;
    }
    else if (this.id == "buttonProstorskispomin") {
        call = loadGameplay;
        gameMode = 1;
        gameMemoryMode = 2;
        gameIterations[gameMemoryMode] = selectedLevel-1;
    }
    else if (this.id == "buttonBackToMenu") {
        mainWindow.empty();
        $(".gameInfo").remove();
        clearInterval(gameTimer);
        clearInterval(padSequenceIT[0]);
        clearTimeout(padSequenceIT[1]);
        setTimeout(loadMainMenu, 10);
    }
    removeEventListeners();
    var children = mainWindow.children();
    d3.select("img#logo").transition().style("opacity", 0).duration(600).each("end", call);
    d3.select("div#titleText").transition().style("opacity", 0).duration(600).each("end", call);
    for (var i = 1; i < children.length; i++) {
        var duration;
        if (children[i].id == this.id)
            duration = 400;
        else
            duration = 600;
        d3.select("#" + children[i].id).transition().style("opacity", 0).duration(duration);
    }

}

function onButtonMouseOut() {
    d3.select("#" + this.id).transition().style("background-color", colorButton).duration(200);
}

function onButtonMouseOver() {
    d3.select("#" + this.id).transition().style("background-color", colorButtonSelected).duration(200);
}

function createButton(text, color, position) {
    var button = '<div class="button" id="button' + text.replace(/ /g, "") + '" style="background-color:' + color + '; top:' + position + '%; opacity:0;">';
    button += '<span class="buttonText">' + text + '</span>';
    button += '</div>';
    return button;
}