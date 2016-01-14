var selectedLevel;

function loadMainMenu() {
    mainWindow.empty();
    loadIcons();
    mainWindow.append('<img id="logo" style="opacity:0;" src="images/brain-image.png" />');

    var buttonNames = ["Igraj", "Vadi", "Analiza", "Navodila"];
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
function loadAnalysis(rawAvg, nBackAvg, padAvg, lastEntry) {
    mainWindow.empty();

    var title = '<div id="titleText" class="titleText" style=" opacity:0;">Analiza</div>';
    var titleTotal = '<div id="titleTotal" class="titleText" style="top:73%;left:75%;opacity:0; margin-top:0; font-size: 2.5vh;">Skupaj</div>';
    var titleAvg = '<div id="titleAvg" class="titleText" style="text-align: center;  height: 6%; width: 22%; background-color: '+"#888888"+'; margin-top:0; font-size: 2.5vh;opacity:0; left: 25%; top: 15%"><span class="buttonText">' + "Povprečje"+ '</span></div>';
    var titleLast = '<div id="titleLast" class="titleText" style="text-align: center; height: 6%; width: 22%;background-color: '+colorBlue+'; margin-top:0; font-size: 2.5vh;opacity:0; left: 75%; top: 15%"><span class="buttonText">' + "Zadnja igra"+ '</span></div>';
    mainWindow.append(title); mainWindow.append(titleAvg); mainWindow.append(titleLast); mainWindow.append(titleTotal);

    var dataTmp;
    var center = false;
    if (document.cookie == "") {dataTmp = ["0","0","0"]; center = true;}
    else dataTmp = document.cookie.replace("last=","").split(",");

    var dataAvg = [rawAvg, nBackAvg, padAvg];
    var dataLast = [parseFloat(dataTmp[0]), parseFloat(dataTmp[1]), parseFloat(dataTmp[2])];
    var dataAll = dataAvg.concat(dataLast);
    var dataAvgSum = [rawAvg + nBackAvg + padAvg];
    var dataLastSum = [dataLast[0] + dataLast[1] + dataLast[2]];
    var dataAllSum = [dataAvgSum, dataLastSum];
    var button = createButton("Nazaj", colorButton, 90);
    mainWindow.append(button);
    d3.select("#buttonNazaj")
        .transition()
        .style("opacity", 1)
        .duration(1000)
        .each("end", function() {
            addEventListeners(this.id);
        });
    var maxHeight = 45;
    var spacing = 15, start = 20;
    d3.select("#mainWindow").selectAll("div1").data(dataAvg).enter().append("div")
        .attr("class", "dataRect")
        .attr("id", "dataAvg")
        .style("opacity",0)
        .style("background-color", "#888888")
        .style("height",function(d){
            if (Math.max.apply(Math, dataAll) == 0) return 2;
            var tmp = d/Math.max.apply(Math, dataAll)*maxHeight;
            if (tmp == 0) return 2;
            return (tmp).toString()+ "%";
        })
        .style("left", function(d,i) { if (center) return (20+i*spacing).toString()+ "%"; else return (18+i*spacing).toString()+ "%";} )
        .transition().duration(1000).style("opacity",1);

    d3.select("#mainWindow").selectAll("div2").data(dataLast).enter().append("div")
        .attr("class", "dataRect")
        .attr("id", "dataLast")
        .style("opacity",0)
        .style("background-color", colorBlue)
        .style("height",function(d){
            if (Math.max.apply(Math, dataAll) == 0) return 2;
            var tmp = d/Math.max.apply(Math, dataAll)*maxHeight;
            if (tmp == 0) return 2;
            return (tmp).toString()+ "%";
        })
        .style("left", function(d,i) {return (22+i*spacing).toString()+ "%";} )
        .transition().duration(1000).style("opacity",1);

    d3.select("#mainWindow").selectAll("div3").data(dataAvgSum).enter().append("div")
        .attr("class", "dataRect")
        .attr("id", "dataAvgSum")
        .style("opacity",0)
        .style("background-color", "#888888")
        .style("height",function(d){
            if (Math.max.apply(Math, dataAllSum) == 0) return 2;
            var tmp = d/Math.max.apply(Math, dataAllSum)*maxHeight;
            if (tmp == 0) return 2;
            return (tmp).toString()+ "%";
        })
        .style("left", function () { if (center) return "75%"; else return "73%";} )
        .transition().duration(1000).style("opacity",1);

    d3.select("#mainWindow").selectAll("div4").data(dataLastSum).enter().append("div")
        .attr("class", "dataRect")
        .attr("id", "dataLastSum")
        .style("opacity",0)
        .style("background-color", colorBlue)
        .style("height",function(d){
            if (Math.max.apply(Math, dataAllSum) == 0) return 2;
            var tmp = d/Math.max.apply(Math, dataAllSum)*maxHeight;
            if (tmp == 0) return 2;
            return (tmp).toString()+ "%";
        })
        .style("left", "77%")
        .transition().duration(1000).style("opacity",1);

    mainWindow.append(icons[0]); mainWindow.append(icons[1]); mainWindow.append(icons[2]);
    d3.select("#iconNumbers").style("top","77%").style("left",(start).toString()+"%");
    d3.select("#iconShapes").style("top","77%").style("left",(start+spacing).toString()+"%");
    d3.select("#iconPads").style("top","77%").style("left",(start+2*spacing).toString()+"%");

    d3.selectAll(".imageIcon").style("height","8%").style("width","8%").transition().duration(1000).style("opacity", 1);
    d3.select("#titleText").transition().style("opacity", 1).duration(1000);
    d3.select("#titleAvg").transition().style("opacity", 1).duration(1000);
    d3.select("#titleLast").transition().style("opacity", 1).duration(1000);
    d3.select("#titleTotal").transition().style("opacity", 1).duration(1000);
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