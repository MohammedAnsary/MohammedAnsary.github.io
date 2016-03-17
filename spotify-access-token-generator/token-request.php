<?php
ini_set('display_errors', 1);
$ch = curl_init();

$headers = array();
$headers[] = 'Content-Type: application/x-www-form-urlencoded; charset=utf-8';
$headers[] = 'Authorization: Basic MmY3YTk0MmFiYmE4NDAwNWExN2EyYWQ0OGYzNWM1ZjU6NjBmMjE0ZTZlZWI3NDIxNjk1ZmRmNzM0YWQxNzIxMjE=';

curl_setopt($ch, CURLOPT_URL,"https://accounts.spotify.com/api/token");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,"grant_type=client_credentials");  //Post Fields
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$server_output = curl_exec ($ch);
curl_close ($ch);
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: '.gethostname());
echo $server_output;
?>
