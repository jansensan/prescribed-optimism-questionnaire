<?php
  $db_host = getSafeEnvVar('DB_HOST');
  $db_name = getSafeEnvVar('DB_NAME');
  $db_username = getSafeEnvVar('DB_USER');
  $db_password = getSafeEnvVar('DB_PASSWORD');
  $table = getSafeEnvVar('QUESTIONNAIRES_STARTED_TABLE');


  // create database connection
  $db = new mysqli($db_host, $db_username, $db_password, $db_name);

  // check connection
  if ($db->connect_error) {
    // TODO: reduce exposed raw error values
    die("Connection failed: " . $db->connect_error);

  } else {
    // query to save to db
    $start_time = $_POST["startTime"];
    $query_string = "INSERT INTO `" . $table . "`" . " (`start_time`) " . " VALUES ('" . $start_time . "')";
    $result = $db->query($query_string);

    echo $result;
  }


  // methods definitions
  function getSafeEnvVar($var_name) {
    return getenv($var_name) ? getenv($var_name) : 'undefined';
  }
?>