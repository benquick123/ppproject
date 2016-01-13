var selectedLevel;

function loadMainMenu() {
    mainWindow.empty();
    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    var buttonNames = ["Igraj", "Vadi", "Lestvica rezultatov", "Navodila"];
    var buttonColor = colorButton;
    for (var i = 0; i < buttonNames.length; i++) {
        var position = 45 + i * 15;
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
}

function addEventListeners(buttonName) {
    var btn = $("#" + buttonName);
    btn.on("click", onButtonClick);
    btn.on("mouseout", onButtonMouseOut);
    btn.on("mouseover", onButtonMouseOver);
}

function removeEventListeners(){
    var children = mainWindow.children();
    for (var i = 1; i < children.length; i++)
        $("#" + children[i].id).off("click", onButtonClick).off("mouseout", onButtonMouseOut).off("mouseover", onButtonMouseOver);
}
function loadHighscore() {
    mainWindow.empty();
    var title = '<div id="titleText" class="titleText" style="opacity:0;">Lestvica rezultatov</div>'
    mainWindow.append(title);
    d3.select(".titleText").transition().style("opacity", 1).duration(1000);

    var button = createButton("Nazaj", colorButton, 90);
    mainWindow.append(button);
    d3.select("#buttonNazaj")
        .transition()
        .style("opacity", 1)
        .duration(1000)
        .each("end", function() {
            addEventListeners(this.id);
        });
}

function loadPractice() {
    selectedLevel = 1;
    mainWindow.empty();
    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    var buttonNames = ["Pomnenje golih podatkov", "Delovni spomin", "Prostorski spomin", "Nazaj"];
    var buttonColor = colorButton;

    for (var i = 0; i < buttonNames.length; i++) {
        var position = 45 + i * 15;
        var button = createButton(buttonNames[i], buttonColor, position);
        mainWindow.append(button);
        d3.select("#button" + buttonNames[i].replace(/ /g, ""))
            .transition()
            .style("opacity", 1)
            .duration(1000)
            .each("end", function() {
                addEventListeners(this.id);
            });
    }

    var levelChooser = '<div id="levelChooser" style="opacity:0;"></div>';
    mainWindow.append(levelChooser);
    var arrowUp = '<img id="arrowUp" class="arrow" src="images/arrow.svg"/>';
    var arrowDown = '<img id="arrowDown" class="arrow rotated" src="images/arrow.svg"/>';
    var arrowUpSelected = '<img id="arrowUpSelected" class="arrowSelected" src="images/arrowSelected.svg" style="opacity: 0;" />';
    var arrowDownSelected = '<img id="arrowDownSelected" class="arrowSelected rotated" src="images/arrowSelected.svg" style="opacity: 0;" />';
    var levelNum = '<span id="levelNum">' + selectedLevel + '</span>';
    $("#levelChooser").append(arrowUp).append(arrowDown).append(arrowUpSelected).append(arrowDownSelected).append(levelNum);
    //d3.selectAll(".arrow")
    d3.selectAll(".arrowSelected").on("click", onArrowClick).on("mouseout", onArrowOut).on("mouseover", onArrowOver);;

    d3.select("img#logo").transition().style("opacity", 1).duration(1000);
    d3.select("div#levelChooser").transition().style("opacity", 1).duration(1000);
}

function onArrowClick() {
    var diff = 0;
    if (this.id == "arrowUpSelected" && selectedLevel < 10)
        diff = 1;
    else if (this.id == "arrowDownSelected" && selectedLevel > 1)
        diff = -1;
    selectedLevel += diff;
    $("#levelNum")[0].innerHTML = selectedLevel;
}

function onArrowOver() {
    d3.select("#" + this.id).transition().style("opacity", 1).duration(200);
}

function onArrowOut() {
    d3.select("#" + this.id).transition().style("opacity", 0).duration(200);
}


function loadInstructions() {
    mainWindow.empty();
    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');
    var buttonNames = ["Pomnenje golih podatkov", "Delovni spomin", "Prostorski spomin"];
    loadIcons();
    var buttonID = [];
    for (var i = 0; i < buttonNames.length; i++) {
        var position = 63+i*8;

        var button = '<div class="button" id="button' + buttonNames[i].replace(/ /g, "") + '" style="background-color:' + colorButton + '; top:' + position + '%; opacity:0;">';
        button += '<span class="buttonText">' + buttonNames[i] + '</span>';
        button += '</div>';
        mainWindow.append(button);
        buttonID[i] = "button" + buttonNames[i].replace(/ /g, "");
        d3.select("#button" + buttonNames[i].replace(/ /g, ""))
            .style("height","6%")
            .style("cursor", "default")
            .transition()
            .duration(1000)
            .style("opacity", 1);
    }
    var button = createButton("Nazaj", colorButton, 90);
    mainWindow.append(button);
    d3.select("#buttonNazaj")
        .transition()
        .style("opacity", 1)
        .duration(1000)
        .each("end", function () {
            addEventListeners(this.id);
        });

    d3.select("img#logo").transition().style("opacity", 1).duration(1000);
    setTimeout(function(){
        addInstrEventListeners(buttonID);
    }, 1000);
}

function addInstrEventListeners(buttonID){
    for (var i = 0; i < buttonID.length; i++)
        $("#"+buttonID[i]).on("mouseout", instructionReset).on("mouseover", instructionShow);
}