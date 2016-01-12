var instrRaw =
    "1. Ploščki zasvetijo v določenem zaporedju.\n" +
    "2. Blisk ozadja označuje začetek igre.\n" +
    "3. Po začetku poklikaj ploščke v zaporedju kot je bil prikazano.";
var instrNBack = "Naredi to i ono";
var instrSpatial = "Na igralni površini so razporejeni modri ploščki. " +
    "Vsako igro se v določenem zaporedju nekaj ploščkov zasveti. " +
    "Naloga je, da po blisku ozadja pritisneš vse ploščke v enakem zaporedju, " +
    "kot je bilo prkazano na začetku. ";
var instrCurrent;

function instructionShow(){
    console.log(this.id);

    d3.select("img#logo").transition().style("opacity", 0).duration(350);
    var selectedText;

    if (this.id == "buttonPomnenjegolihpodatkov") selectedText = instrRaw;
    else if (this.id == "buttonDelovnispomin")selectedText = instrNBack;
    else selectedText = instrSpatial;

    instrCurrent = '<div class="instruction" id="instruction">';
    instrCurrent += selectedText;
    instrCurrent += '</div>';
    mainWindow.append(instrCurrent);

    d3.select("#instruction").transition().duration(500).style("opacity", 1);
    d3.select("#" + this.id).transition().style("background-color", colorButtonSelected).duration(200);

}

function instructionReset(){
    d3.select("#" + this.id).transition().style("background-color", colorButton).duration(200);
    $("#instruction").remove();
    d3.select("#instruction").transition().style("opacity", 0).duration(350);
    d3.select("img#logo").transition().style("opacity", 1).duration(350);
}