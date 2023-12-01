<?php
$hostname = 'roundhouse.proxy.rlwy.net';
$database = 'railway';
$username = 'root';
$password = 'bba-gb1A442-h5a23aGAeg3eg24-E21B';
$port = 50074;

$mysqli = new mysqli($hostname, $username, $password, $database, $port);
if ($mysqli->connect_errno) {
    echo "Falha ao conectar: (" . $mysqli->connect_errno . ")" . $mysqli->connect_error;
}
