<?php

  include_once __DIR__ . '/../models/posts_model.php';
  header('Content-Type: application/json');

  if ($_REQUEST['action'] === 'index'){
      echo json_encode(Reply::all());
  } else if ($_REQUEST['action'] === 'post'){
      $request_body = file_get_contents('php://input');
      $body_object = json_decode($request_body);
      $new_post = new Post(null, $body_object->name, $body_object->reply);
      $all_posts = Reply::create($new_post);
      echo json_encode($all_posts);
  } else if ($_REQUEST['action'] === 'update'){
      $request_body = file_get_contents('php://input');
      $body_object = json_decode($request_body);
      $updated_post = new Post($_REQUEST['id'], $body_object->name, $body_object->reply);
      $all_posts = Reply::update($updated_post);
      echo json_encode($all_posts);
  } else if ($REQUEST['action'] === 'delete'){
      $all_posts = Reply::delete($_REQUEST['id']);
      echo json_encode($all_posts);
  }

 ?>
