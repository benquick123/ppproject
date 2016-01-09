function loadMainMenu() {
    mainWindow.empty();
    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    buttonNames = ["Igraj", "Vadi", "Lestvica rezultatov"];
    buttonColor = "#FB892A";
    for (var i = 0; i < buttonNames.length; i++) {
        position = 45 + i * 15;
        button = createButton(buttonNames[i], buttonColor, position);
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
    $("#" + buttonName).on("click", onButtonClick);
    $("#" + buttonName).on("mouseout", onButtonMouseOut);
    $("#" + buttonName).on("mouseover", onButtonMouseOver);
}

function loadHighscore() {
    mainWindow.empty();
    title = '<div id="titleText" class="titleText" style="opacity:0;">Lestvica rezultatov</div>'
    mainWindow.append(title);
    d3.select(".titleText").transition().style("opacity", 1).duration(1000);

    button = createButton("Nazaj", "#FB892A", 90);
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

    buttonNames = ["Pomnenje golih podatkov", "Delovni spomin", "Prostorski spomin", "Nazaj"];
    buttonColor = "#FB892A";

    for (var i = 0; i < buttonNames.length; i++) {
        position = 45 + i * 15;
        button = createButton(buttonNames[i], buttonColor, position);
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