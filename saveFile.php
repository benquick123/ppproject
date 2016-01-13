<?php
if(!empty($_POST['data'])){
	$fname = "scores.txt";
    $fileData = file($fname);
    $removed = 0;

	if (count($fileData) == 50) {
	    unset($fileData[0]);
	    $removed = 1;
	}

	if ($removed == 1) {
	    $file = fopen($fname, 'w');
	    foreach ($fileData as $line) {
	        fwrite($file, $line);
	    }
	}
	else {
	    $file = fopen($fname, 'a');
	}

    $data = $_POST['data'];
	fwrite($file, $data);
	fclose($file);
}
?>
	