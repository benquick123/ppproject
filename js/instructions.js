var instrRaw =
    "Na igralni površini se prikažejo surovi podatki v obliki števil." +
    "Tvoja naloga je, da si prikazane podatke čim hitreje zapomniš. " +
    "Ob pritisku na zelen gumb se prične preverjanje tvojega spomina. " +
    "Na sredini igralne površine se pokaže določeno število, tvoja naloga pa je, " +
    "da s pritiskom na zelen ali rdeč gumb na podlagi spomina odločiš, ali je bilo število prikazano " +
    "v prvotni množici števil. S pritiskom na zelen gumb trditev potrdiš, z pritiskom na rdeč gumb pa zavrneš. " +
    "Težavnost se povečuje s spremembo števila podatkov, velikosti množice števil in " +
    "številom primerov. " +
    "Čas, ki ga porabiš, da si števila zapomniš je vključen v izračun točk. Hitrejši kot si, več točk dobiš.";
var instrNBack = "Naredi to i ono";
var instrSpatial = "Naredi to i ono";
var instrCurrent;

function showInstructions(){
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
    d3.select("#" + this.id).transition().style("background-color", "#D56100").duration(200);

}

function reset(){
    d3.select("#" + this.id).transition().style("background-color", "#FB892A").duration(200);

    d3.select("#instruction").transition().style("opacity", 0).duration(350).each("end",function(){
        $("#instruction").remove();
        console.log($("#instruction").remove());
    });
    d3.select("img#logo").transition().style("opacity", 1).duration(350);
}