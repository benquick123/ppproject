var rawAvg, nBackAvg, padAvg;
var allTotalScores;

function loadFile() {
    var iFrame = '<iframe id="file" src="scores.txt" onload="handleFile();" style="display: none;"></iframe>';
    mainWindow.append(iFrame);
}

function handleFile() {
    var rawAvg = 0, nBackAvg = 0; padAvg = 0;
    var allTotalScores = [];

    var fileFrame = document.getElementById("file");
    var strRawContents = fileFrame.contentWindow.document.body.childNodes[0].innerHTML;
    var values = strRawContents.split("\n");

    for (var i = 0; i < values.length-1; i++) {
        var currValues = values[i].split(",");
        rawAvg += parseFloat(currValues[0]);
        nBackAvg += parseFloat(currValues[1]);
        padAvg += parseFloat(currValues[2]);
        allTotalScores[i] = parseFloat(currValues[3]);
    }

    rawAvg /= values.length;
    nBackAvg /= values.length;
    padAvg /= values.length;

    /*console.log(rawAvg);
    console.log(nBackAvg);
    console.log(padAvg);
    console.log(allTotalScores);*/
}

function saveFile(rawResult, nBackResult, padResult, total) {
    var data = new FormData();
    data.append("data" , rawResult + "," + nBackResult + "," + padResult + "," + total + "\n");
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'saveFile.php', true);
    xhr.send(data);
}