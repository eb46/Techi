<?php

$dbconn = pg_connect("host=localhost dbname=techi");

class Post {
  public $id;
  public $name;
  public $reply;

  public function __construct($id, $name, $reply) {
    $this->id = $id;
    $this->name = $name;
    $this->reply = $reply;
  }
}

class Reply {
  static function all(){
    $replies = array();

    $results = pg_query("SELECT * FROM reply");

    $row_object = pg_fetch_object($results);
    while($row_object) {
      $new_reply = new Post(
        intval($row_object->id),
        $row_object->name,
        $row_object->reply
      );
      $replies[] = $new_reply;
      $row_object = pg_fetch_object($results);
    }
    return $replies;
  }
// create function
  static function create($reply){
    $query = "INSERT INTO reply (name, reply) VALUES ($1, $2)";
    $query_params = array($reply->name, $reply->reply);
    pg_query_params($query, $query_params);

    return self::all();
  }
// update function
  static function update($updated_reply){
    $query = "UPDATE reply SET name= $1, reply = $2 WHERE id = $4";
    $query_params = array($updated_reply->name, $updated_reply->reply, $updated_reply->id);
    $result = pg_query_params($query, $query_params);

    return self::all();
  }

  static function delete($id){
    $query = "DELETE FROM reply WHERE id = $1";
    $query_params = array($id);
    $result = pg_query_params($query, $query_params);

    return self::all();
  }
}

 ?>
