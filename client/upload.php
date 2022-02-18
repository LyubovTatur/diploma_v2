<?php

$json = file_get_contents('php://input');
$body = json_decode($json)

file_get_contents('frames/'.time().'.jpg',base64_decode($body->jpg)
?>
