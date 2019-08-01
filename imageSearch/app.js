const express = require ("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//routes 

//route route
app.get("/" , async function(req, res){
  
  var imageURLs = await tools.getRandomImages("", 1);
  //console.log("imageURLs using promies: " + imageURLs);
  res.render("index", {"imageURL": imageURLs});
  
        
});//root route


app.get("/search", async function(req, res){
  //console.log(req.query.keyword)
  var keyword = req.query.keyword;
  
  var imageURLs = await tools.getRandomImages(keyword, 9);
  console.log("imageURLs using promies: " + imageURLs);
  res.render("results", {"imageURLs": imageURLs, "keyword" : keyword});
  
 // getRandomImages_cb(keyword, 9,function(imageURLs){
   // console.log("imageURLs: " + imageURLs);
    //res.render("results", {"imageURLs": imageURLs});
 // })
       
});//search

app.get("/api/updateFavorites", function(req,res){
  
var conn = tools.createConnection();
  
  var sql;
  var sqlParams; 
  
  
  if(req.query.action == "add"){
  sql = "INSERT INTO favorites(imageURL, keyword) VALUES (?,?)";
  sqlParams = [req.query.imageURL, req.query.keyword];
  } else{
    sql = "DELETE FROM favorites WHERE imageURL = ?";
    sqlParams = [req.query.imageURL];
    
  }
  conn.connect( function(err){
    
  if (err) throw err;
    
    conn.query(sql, sqlParams, function(err, result){
      
        if (err) throw err;
      
    })
    
  });//connect
  
  res.send("it works!");
});//updateFav


app.get("/displayKeywords", function(req, res){
  
  var conn = tools.createConnection();
  var sql = "SELECT DISTINCT keyword FROM `favorites` ORDER BY keyword";
  
  conn.connect(function(err){
    
    if (err) throw err;
    conn.query(sql, function(err, result){
      if(err) throw err;
      res.render( "favorites" , {"rows": result});
      
    });//query
    
  });// connect
});//display Keywords

app.get("/api/displayFavorites", function(req, res){
  
  
   var conn = tools.createConnection();
   var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
   var sqlParams = [req.query.keyword];
  
   conn.connect(function(err){
    
    if (err) throw err;
    conn.query(sql, sqlParams, function(err, results){
      if(err) throw err;
      res.send(results);
      
    });//query
    
  });// connect
  
  
});


//server listener
app.listen("8081" , "0.0.0.0", function(){
  console.log("Express server is running")
})