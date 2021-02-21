const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const app = express();


const Article = require("./models/article")

// connect to database

mongoose.connect("mongodb://localhost/nodekb",{ useUnifiedTopology: true });
const db = mongoose.connection;

//check connection
db.once("open", function() {
    console.log("Connected to Mongodb");
})


//check for db errors
db.on("error", function(err) {
    console.log(err);
});

app.set('view engine');

app.use("/", function(req, res){
  Article.find({}, function(err, article) {
       if(err){
           console.log(err);
       }else{
        res.render("index",{
            title:"Articles",
            article:"article"
        })
       }
   
  });
   
//   let article= [
//       { id:"1",
//         title:"Article One",
//         author:"Kezia Baidoo",
//         body:"This is one article"
//     },

//     {
//         id:"2",
//         title:"Article Two",
//         author:"Kezia Baidoo",
//         body:"This is two article"
//     },

//     {
//         id:"3",
//         title:"Article Three",
//         author:"Kezia Baidoo",
//         body:"This is three article"
//     }


//   ]
});

app.use("/article/add", function() {
    res.render("add_article",{

        title:"Add Article"
    })
})

app.listen(30001 , function() {
    console.log("Server started on port 3000")
});
