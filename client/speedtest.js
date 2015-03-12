/*
   SpeedOf.Me, HTML5 Speed Test 
   http://speedof.me - contact@speedof.me 
   All rights reserved. Copyright (c) SPEED OF ME, 2011-2014 
   API v2.74   
   For more information about SpeedOf.Me API please visit http://speedof.me/api
   */ 

   
   Meteor.startup(function () {
    // code to run on server at startup
    SomApi.account = "SOM5500d2a408181";  //your API Key here
SomApi.domainName = "bangkok-coffee-shops.meteor.com";  //your domain or sub-domain here 
SomApi.config.sustainTime = 4; 
SomApi.onTestCompleted = onTestCompleted;
SomApi.onError = onError;
});



   var msgDiv = document.getElementById("msg");

   function btnStartClick() {
   	msgDiv.innerHTML = "<h3>Speed test in progress. Please wait...</h3>";
   	SomApi.startTest();
   }

   function onTestCompleted(testResult) {
   	console.log(testResult);

   }

   function onError(error) {
   	msgDiv.innerHTML = "Error "+ error.code + ": "+error.message;
   }