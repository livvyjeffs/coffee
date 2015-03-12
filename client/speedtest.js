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
// SomApi.onTestCompleted = onTestCompleted;
SomApi.onError = onError;
// SomApi.onProgress = onProgress;

SomApi.config.sustainTime = true;
SomApi.config.testServerEnabled = true;
SomApi.config.userInfoEnabled = true;
SomApi.config.latencyTestEnabled = true;
SomApi.config.uploadTestEnabled = true;
SomApi.config.progress.enabled = true;
SomApi.config.progress.verbose = true;
});

// function btnStartClick() {
// //set config values

// }

// var test;

// function onTestCompleted(testResult) {

// test = testResult;


// 	// msgDiv.innerHTML = "<h3>--------------- Test Result ---------------</h3><h4>" +
// 	// "Download: " + testResult.download + " Mbps <br/>" +
// 	// "Upload: " + testResult.upload + " Mbps <br/>" +
// 	// "Latency: " + testResult.latency + " ms <br/>" +
// 	// "Jitter: " + testResult.jitter + " ms <br/>" +
// 	// "Test Server: " + testResult.testServer + "<br/>" +
// 	// "IP: " + testResult.ip_address + "<br/>" +
// 	// "Hostname: " + testResult.hostname + "<br/>" +
// 	// "</h4>";
// }

function onError(error) {
	// msgDiv.innerHTML = "Error " + error.code + ": " + error.message;
}

function onProgress(progress) {
	// prgsDiv.innerHTML =
	// "<h3>--------------- Progress ---------------</h3><h4>" +
	// "Progress Type: " + progress.type + "<br/>" +
	// "Pass: " + progress.pass + "<br/>" +
	// "Percent Done: " + progress.percentDone + "% <br/>" +
	// "Current Speed: " + progress.currentSpeed + " Mbps <br/>" +
	// "</h4>";
}
