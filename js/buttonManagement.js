function onButtonClick() {
    //console.log(mainWindow.children());
    call = null;
    if (this.id == "buttonIgraj") {
        call = loadGameplay;
        mode = 0;
    }
    else if (this.id == "buttonVadi")
        call = loadPractice;
    else if (this.id == "buttonLestvicarezultatov")
        call = loadHighscore;
    else if (this.id == "buttonNazaj")
        call = loadMainMenu;
    else if (this.id == "buttonPomnenjegolihpodatkov") {
        call = loadGameplay;
        mode = 1;
        memoryMode = 0;
    }
    else if (this.id == "buttonDelovnispomin") {
        call = loadGameplay;
        mode = 1;
        memoryMode = 1;
    }
    else if (this.id == "buttonProstorskispomin") {
        call = loadGameplay;
        mode = 1;
        memoryMode = 2;
    }

    children = mainWindow.children();
    d3.select("img#logo").transition().style("opacity", 0).duration(600).each("end", call);
    d3.select("div#titleText").transition().style("opacity", 0).duration(600).each("end", call);
    for (var i = 1; i < children.length; i++) {
        if (children[i].id == this.id)
            duration = 200;
        else
            duration = 600;
        d3.select("#" + children[i].id).transition().style("opacity", 0).duration(duration);
    }
}

function onButtonMouseOut() {
    d3.select("#" + this.id).transition().style("background-color", "#FB892A").duration(200);
}

function onButtonMouseOver() {
    d3.select("#" + this.id).transition().style("background-color", "#D56100").duration(200);
}

function createButton(text, color, position) {
    button = '<div class="button" id="button' + text.replace(/ /g, "") + '" style="background-color:' + color + '; top:' + position + '%; opacity:0;">';
    button += '<span class="buttonText">' + text + '</span>';
    button += '</div>';
    return button;
}