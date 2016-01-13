var icons = [];
function loadIcons() {
    var iconNames = ["shapes.png", "pads.png", "numbers.png"];
    for (var i = 0; i < iconNames.length; i++) {
        icons[i] = '<div id="icon" class="imageIconDiv">';
        icons[i] += '<img class="imageIcon" src="images/icons/' + iconNames[i] + '" style="opacity:0;"/>';
        icons[i] += '</div>';
    }
}

var instrRaw =
    "1. Na površini se prikažejo podatki v obliki števil.<br/><br/>"+
    "2. Hitro si jih zapomni in pritisni zelen gumb.<br/><br/>" +
    "3. V naslednjem delu te igra vpraša, če se je določena številka pojavila med podatki.<br/><br/>" +
    "4. Za potrditev pritisni na zelen gumb, drugače na rdečega.<br/><br/>" +
    "5. Čas teče le med ogledovanjem podatkov, do pritiska na zelen gumb.";
var instrNBack =
    "1. Na sredini se prikazujejo liki. Za vsak lik si zapomni barvo in obliko.<br/><br/>"+
    "2. V zgornjem delu površine je število, ki ti pove, za koliko mest nazaj moraš pomniti like.<br/><br/>" +
    "3. Ob blisku se v spodnjem delu prikažejo možni liki. Klikni na tistega, ki se je pojavil n-mest nazaj.<br/><br/>" +
    "4. Čas teče od bliska do prve zmote ali klika na zadnji lik v določenem zaporedju.";
var instrSpatial =
    "1. Ploščki zasvetijo v določenem zaporedju.<br/><br/>"+
    "2. Blisk ozadja označuje začetek igre.<br/><br/>" +
    "3. Po začetku poklikaj ploščke v zaporedju kot je bilo prikazano na začetku.<br/><br/>" +
    "4. Čas teče od bliska do prve zmote ali klika na zadnji plošček v zaporedju. ";
var instrCurrent;

function instructionShow(){
    d3.select("img#logo").transition().style("opacity", 0).duration(350);
    var selectedText;
    var selectedIcon;
    if (this.id == "buttonPomnenjegolihpodatkov") {selectedText = instrRaw; selectedIcon = icons[2];}
    else if (this.id == "buttonDelovnispomin"){selectedText = instrNBack; selectedIcon = icons[0];}
    else {selectedText = instrSpatial; selectedIcon = icons[1];}

    instrCurrent = '<div class="instruction" id="instruction">';
    instrCurrent += selectedText;
    instrCurrent += '</div>';
    mainWindow.append(instrCurrent);
    mainWindow.append(selectedIcon);

    d3.select("#instruction").transition().duration(500).style("opacity", 1);
    d3.select(".imageIcon").style("top","7.5%").style("left","50%").transition().duration(500).style("opacity", 1);
    d3.select("#" + this.id).transition().style("background-color", colorButtonSelected).duration(200);

}

function instructionReset(){
    d3.select("#" + this.id).transition().style("background-color", colorButton).duration(200);
    $("#instruction").remove();
    $("#icon").remove();
    d3.select("#instruction").transition().style("opacity", 0).duration(350);
    d3.select("img#logo").transition().style("opacity", 1).duration(350);
}
