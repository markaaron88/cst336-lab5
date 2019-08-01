const request = require('request');
const mysql = require('mysql');

module.exports = {

  
/**
* Return random image URLS from an API
*@param string keyword - search term
*@param int imageCount - number of random images
*@return array of image URLs
*
*/ 
 
getRandomImages_cb: function(keyword, imageCount, callback){
  var requestURL ="https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=d98d436d70bf814d5a5f65690d3cc31f37c4ddeb540b9c86a9aa885e912195e0"
  request(requestURL, function(error, response, body){
  if(!error){
    var parsedData = JSON.parse(body);
    
    var imageURLs = [];
    for(let i = 0; i < 9; i++){
      imageURLs.push(parsedData[i].urls.regular);
    }
    
    callback(imageURLs);
  }  else{
    console.log("error", error)
  
  } 
}); //request
  
},
  
  getRandomImages: function( keyword, imageCount){
  var requestURL ="https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=d98d436d70bf814d5a5f65690d3cc31f37c4ddeb540b9c86a9aa885e912195e0"
  
  return new Promise(function(resolve, reject){
  request(requestURL, function(error, response, body){
  if(!error){
    var parsedData = JSON.parse(body);
    var imageURLs = [];
    for(let i = 0; i < imageCount; i++){
      imageURLs.push(parsedData[i].urls.regular);
    }
    
    resolve(imageURLs);
  }  else{
    console.log("error", error)
  
    } 
    }); //request
  });
},//function
  
  /**
   *creates database connect
   * @return db connection
  */
  createConnection() {
      var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
  password:"",
  database:"img_gallery"  
  });
    return conn;
  }
}