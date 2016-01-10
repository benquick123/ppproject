function loadMainMenu() {
    mainWindow.empty();
    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    var buttonNames = ["Igraj", "Vadi", "Lestvica rezultatov"];
    var buttonColor = "#FB892A";
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

function loadHighscore() {
    mainWindow.empty();
    var title = '<div id="titleText" class="titleText" style="opacity:0;">Lestvica rezultatov</div>'
    mainWindow.append(title);
    d3.select(".titleText").transition().style("opacity", 1).duration(1000);

    var button = createButton("Nazaj", "#FB892A", 90);
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
    mainWindow.empty();
    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    var buttonNames = ["Pomnenje golih podatkov", "Delovni spomin", "Prostorski spomin", "Nazaj"];
    var buttonColor = "#FB892A";

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

    d3.select("img#logo").transition().style("opacity", 1).duration(1000);
}