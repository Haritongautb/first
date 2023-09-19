<?php
// Это пишем когда работате с JSON форматом
$_POST = json_decode(file_get_contents("php://input"), true);


// Это пишется всегда
echo var_dump($_POST);