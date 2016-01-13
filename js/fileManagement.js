var fileCallback;

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
        //console.log(currValues);
    }

    rawAvg /= values.length;
    nBackAvg /= values.length;
    padAvg /= values.length;
    //console.log(allTotalScores);
    allTotalScores = allTotalScores.sort(function(a,b) { return a - b;});

    var lastEntry = values[values.length - 2];

    if (fileCallback.name == "displayPercentageBest")
        fileCallback(rawAvg, nBackAvg, padAvg, allTotalScores);
    else
        console.log(lastEntry);
}

function saveFile(rawResult, nBackResult, padResult, total) {
    var data = new FormData();
    data.append("data" , rawResult + "," + nBackResult + "," + padResult + "," + total + "\n");
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'saveFile.php', true);
    xhr.send(data);
}