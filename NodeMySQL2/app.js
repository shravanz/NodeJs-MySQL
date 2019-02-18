// Importing Modules
const express = require("express");
const mysql = require("mysql");
const app = express();

//Create sql conncetion
const db = mysql.createConnection({
  //this is configuration object
  host: "localhost",
  user: "root",
  password: "mindtree",
  database: "nodemysql"
});

//Connect to Sql database
db.connect(err => {
  if (err) {
    console.log(" SQL conncetion Error" + err);
  }
  console.log("MySql Connected..");
});

//////////////////////// Create DB /////////////////////////////////////////////
app.get("/createDB", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json("Your database has been created..");
  });
});

//////////////////////// Create Table //////////////////////////////////////////
app.get("/createPostsTable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("posts table created...");
  });
});
//////////////////////// Insert  into Table posts /////////////////////////////
app.get("/addPost", (req, res) => {
  let post = { title: "post One", body: "This is post number one" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post one added...");
  });
});
//////////////////////// Select posts ///////////////////////////////////////
app.get("/getPosts", (req, res) => {
  let sql = "SELECT * from posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});
//////////////////////// Select Single post /////////////////////////////////
app.get("/getPost/:id", (req, res) => {
  let sql = `SELECT * from posts WHERE id = ${req.params.id}`;
  // TODO Here we need to validate the ID coming from request
  let query = db.query(sql, (err, result) => {
    if (err) {
      res.json({ msg: "ERR" });
    } else if (result[0].id == undefined) {
      res.json({ msg: "ID not found" });
    } else {
      console.log(result[0].id);
      console.log(query.sql);
      res.json(result);
    }
  });
});
//////////////////////// Update posts ///////////////////////////////////////
app.get("/updatePost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${
    req.params.id
  }`;
  // TODO Here we need to validate the ID coming from request
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//////////////////////// Delete posts ///////////////////////////////////////
app.get("/deletePost/:id", (req, res) => {
  let sql = `DELETE  FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post Deleted");
  });
});

//Creating Express server
// establish port conncetion
app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
