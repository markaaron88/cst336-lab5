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
  res.render("results", {"imageURLs": imageURLs});
  
 // getRandomImages_cb(keyword, 9,function(imageURLs){
   // console.log("imageURLs: " + imageURLs);
    //res.render("results", {"imageURLs": imageURLs});
 // })
       
});//search

app.get("/api/updateFavorites", function(req,res){
  
  var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
  password:"",
  database:"img_gallery"  
  })
  
  var sql = "INSERT INTO favorites(imageURL, keyword) VALUES (?,?)";
  
  var sqlParams = [req.query.imageURL, req.query.keyword];
  
  conn.connect( function(err){
    
  if (err) throw err;
    
    conn.query(sql, sqlParams, function(err, result){
      
        if (err) throw err;
      
    })
    
  });//connect
  
  res.send("it works!");
});//updateFav



//server listener
app.listen("8081" , "0.0.0.0", function(){
  console.log("Express server is running")
})