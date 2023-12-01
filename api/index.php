<?php
$hostname = 'hostname';
$database = 'database';
$username = 'username';
$password = 'password';
$port = 'port';

$mysqli = new mysqli($hostname, $username, $password, $database, $port);
if ($mysqli->connect_errno) {
    echo "Falha ao conectar: (" . $mysqli->connect_errno . ")" . $mysqli->connect_error;
}
