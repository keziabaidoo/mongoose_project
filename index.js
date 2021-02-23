const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const Article = require("./models/article");

// COMMENTS FROM MIKE TO KEZIA

/*
    Kezia, Good work connecting the mongoose with mongodb and learning the basics
    of using the Object Relational Mapper (ORM).

    However, we haven't started connecting our app to a front end client.
    You were supposed to create a CRUD application with NodeJS Only. No front end, just
    like we did for the mysql app.

    You'll realize that I moved your codes to the db.open function.
    Basically, we are creating a new article and then fetching all results in the article 
    collection.

    You should add the update and delete functionalities before going to sleep today, Feb 22, 2021.
    Good luck.
    

*/
// END OF COMMENTS FROM MIKE TO KEZIA
// connect to database

mongoose.connect("mongodb://localhost/nodekb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;

//check connection
db.once("open", function () {
  console.log("Connected to Mongodb");

  // Add a new article
  const myArticle = new Article({
    title: "The Merchant of Venice",
    author: "William Shakespeare",
    body:
      "The Merchant of Venice is a 16th-century play written by William Shakespeare in which a merchant in Venice named Antonio defaults on a large loan provided by a Jewish moneylender, Shylock",
  });

  // save article object to the Mongoose DB
  myArticle.save();

  Article.find({}, function (err, article) {
    if (err) {
      console.log(err);
    } else {
      console.log(article);
    }
  });
});

//check for db errors
db.on("error", function (err) {
  console.log(err);
});

app.set("view engine");

app.use("/", function (req, res) {
  Article.find({}, function (err, article) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Articles",
        article: "article",
      });
    }
  });
});

app.use("/article/add", function () {
  res.render("add_article", {
    title: "Add Article",
  });
});

app.listen(30001, function () {
  console.log("Server started on port 3000");
});
