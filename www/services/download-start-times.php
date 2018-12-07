<?php
  $db_host = getSafeEnvVar('DB_HOST');
  $db_name = getSafeEnvVar('DB_NAME');
  $db_username = getSafeEnvVar('DB_USER');
  $db_password = getSafeEnvVar('DB_PASSWORD');
  $table = getSafeEnvVar('QUESTIONNAIRES_STARTED_TABLE');


  // create database connection
  $db = new mysqli(
    $db_host,
    $db_username,
    $db_password,
    $db_name
  );

  // check connection
  if ($db->connect_error) {
    // TODO: reduce exposed raw error values
    die("Connection failed: " . $db->connect_error);

  } else {
    // fetch data
    $query_string = "SELECT * FROM " . $table;
    $result = $db->query($query_string);

    // create data array
    $tuples  = array();
    while ($row = $result->fetch_assoc()) {
      array_push($tuples, $row);
    }

    // return json
    echo json_encode($tuples);
  }


  // methods definitions
  function getSafeEnvVar($var_name) {
    return getenv($var_name) ? getenv($var_name) : 'undefined';
  }
?>