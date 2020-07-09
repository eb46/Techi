<?php

$dbconn = null;
if(getenv('DATABASE_URL')){
$connectionConfig = parse_url(getenv('DATABASE_URL'));
$host = $connectionConfig['host'];
$user = $connectionConfig['user'];
$password = $connectionConfig['pass'];
$port = $connectionConfig['port'];
$dbname = trim($connectionConfig['path'],'/');
$dbconn = pg_connect(
"host=".$host." ".
"user=".$user." ".
"password=".$password." ".
"port=".$port." ".
"dbname=".$dbname
);
} else {
$dbconn = pg_connect("host=localhost dbname=techi");
}



class Post {
  public $id;
  public $name;
  public $topic;
  public $reply;

  public function __construct($id, $name, $topic, $reply) {
    $this->id = $id;
    $this->name = $name;
    $this->topic = $topic;
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
        $row_object->topic,
        $row_object->reply
      );
      $replies[] = $new_reply;
      $row_object = pg_fetch_object($results);
    }
    return $replies;
  }
// create function
  static function create($reply){
    $query = "INSERT INTO reply (name, topic, reply) VALUES ($1, $2, $3)";
    $query_params = array($reply->name, $reply->topic, $reply->reply);
    pg_query_params($query, $query_params);

    return self::all();
  }
// update function
  static function update($updated_reply){
    $query = "UPDATE reply SET name= $1, topic = $2, reply = $3 WHERE id = $4";
    $query_params = array($updated_reply->name, $updated_reply->topic, $updated_reply->reply, $updated_reply->id);
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
