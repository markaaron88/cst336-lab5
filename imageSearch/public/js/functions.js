$(document).ready(function(){
  
  $(".favoriteIcon").on("click", function(){
     
   // alert($(this).prev().attr("src"));
    
    var imageURL= ($(this).prev().attr("src"));
    
    if($(this).attr("src") == "img/fav_off.png"){
      $(this).attr("src","img/fav_on.png");
      updateFavorite(imageURL);
    }else{
     $(this).attr("src","img/fav_off.png");
    }
    
  });
  
  function updateFavorite(imageURL){
    
    $.ajax({
      method: "get",
        url: "/api/updateFavorites", 
        data: {"imageURL" : imageURL,
                "keyword" : "coming soon!"
              
              }
      
    });//ajax
  }
  
});