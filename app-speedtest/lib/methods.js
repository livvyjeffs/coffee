// Meteor.methods({
//   'instantiateSpeedTest': function(){
//     SomApi.account = "SOM5500d2a408181";  //your API Key here
//     SomApi.domainName = "bangkok-coffee-shops.meteor.com";  //your domain or sub-domain here 
//     SomApi.config.sustainTime = 4; 

//     SomApi.config.testServerEnabled = true;
//     SomApi.config.userInfoEnabled = true;
//     SomApi.config.latencyTestEnabled = true;
//     SomApi.config.uploadTestEnabled = true;
//     SomApi.config.progress.enabled = true;
//     SomApi.config.progress.verbose = true;

//     SomApi.onError = function onError(error){
//       alert('error: see console');
//       console.log(error);
//     };

//     SomApi.onTestCompleted = function onTestCompleted(testResult){

//       Session.set('speedtestResult',testResult);

//     }

//     SomApi.onProgress = function onProgress(progress){

//       // console.log('current speed: ' + progress.currentSpeed);

//     }

//   }
// });
