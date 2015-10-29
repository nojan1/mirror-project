<?php

$page = file_get_contents("http://galaxen.com/restaurang/dagens-lunch/");

preg_match('/<section class="lunch-list".*?>(.*?)<\/section>/s', $page, $matches);
$fulltable = $matches[1];

//get weak
preg_match("/<h2>Matsedel (\d*)<\/h2>/",$fulltable, $matches);
$weak = $matches[1];

//get lunch container
preg_match('/<div class="lunch-list.*?><ul>(.*)<\/ul>/s', $fulltable,  $matches);
$lunch = $matches[1];
//print_r($matches);

//get days
preg_match_all("/<li>(.*?<\/ul>).*?<\/li>/s", $lunch, $rowmatches);

$finalrows = array();
foreach($rowmatches[1] as $row){
		preg_match("/<h3>(.*?)<\/h3>/",$row, $matches);
		$day = $matches[1];
		
		preg_match("/<ul>(.*?)<\/ul>/s", $row, $matches);
		$sublist = $matches[1];

		preg_match_all("/<li>(.*?)<\/li>/s", $sublist, $foods);
		
		$foodlist = array();
		foreach($foods[1] as $food){
			$foodlist[] = trim($food);
		}
		
		$finalrows[] = array("name" => $day, "foods" => $foodlist);
}

$retval = array("week" => $weak, "days" => $finalrows);
echo json_encode($retval);
