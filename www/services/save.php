<?php
  $dbHost = getSafeEnvVar('DB_HOST');
  $dbName = getSafeEnvVar('DB_NAME');
  $dbUsername = getSafeEnvVar('DB_USER');
  $dbPassword = getSafeEnvVar('DB_PASSWORD');
  $responsesTable = getSafeEnvVar('RESPONSES_TABLE');

  // create database connection
  $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

  // check connection
  if ($db->connect_error) {
    // TODO: reduce exposed raw error values
    die("Connection failed: " . $db->connect_error);

  } else {
    // query to save to db
    $data = $_POST["data"];
    $query_string = "INSERT INTO " . $responsesTable
      . " (data) " . " VALUES (" . $data . ")";

    $result = $db->query($query_string);

    echo $result;
  }
?>