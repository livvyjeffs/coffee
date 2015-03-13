
Meteor.startup(function(){

		SomApi.account = "SOM5500d2a408181";  //your API Key here
    SomApi.domainName = "bangkok-coffee-shops.meteor.com";  //your domain or sub-domain here 
    SomApi.config.sustainTime = 2; 

    SomApi.config.testServerEnabled = true;
    SomApi.config.userInfoEnabled = true;
    SomApi.config.latencyTestEnabled = true;
    SomApi.config.uploadTestEnabled = true;
    SomApi.config.progress.enabled = true;
    SomApi.config.progress.verbose = true;

    SomApi.onError = function onError(error){
    	alert('error: see console');
    	console.log(error);
    };

    SomApi.onTestCompleted = function onTestCompleted(testResult){

    	Session.set('speedtestResult',testResult);

    	$('#speed-progress').text('');
    	$('#speed-down').html('Your WiFi is ' + testResult.download + '<span class="up"></span> ' + testResult.upload + '<span class="down"></span> Mbps');
    	$('#speed-add').show();
    
    }

    SomApi.onProgress = function onProgress(progress){

    	$('#speed-progress').text(progress.percentDone + '% and current speed: ' + progress.currentSpeed + 'Mbps');

    }


    SomApi.startTest();

});



// Template.speedtest.rendered = function(template){

// 		SomApi.account = "SOM5500d2a408181";  //your API Key here
//     SomApi.domainName = "bangkok-coffee-shops.meteor.com";  //your domain or sub-domain here 
//     SomApi.config.sustainTime = 2; 

//     SomApi.config.testServerEnabled = true;
//     SomApi.config.userInfoEnabled = true;
//     SomApi.config.latencyTestEnabled = true;
//     SomApi.config.uploadTestEnabled = true;
//     SomApi.config.progress.enabled = true;
//     SomApi.config.progress.verbose = true;

//     SomApi.onError = function onError(error){
//     	alert('error: see console');
//     	console.log(error);
//     };

//     SomApi.onTestCompleted = function onTestCompleted(testResult){

//     	Session.set('speedtestResult',testResult);

//     	$('#speed-progress').text('');
//     	$('#speed-down').html('Your WiFi is ' + testResult.download + '<span class="up"></span> ' + testResult.upload + '<span class="down"></span> Mbps');
//     	$('#speed-add').show();

//     }

//     SomApi.onProgress = function onProgress(progress){

//     	$('#speed-progress').text(progress.percentDone + '% and current speed: ' + progress.currentSpeed + 'Mbps');

//     }


//     SomApi.startTest();


// }

Template.speedtest.events({
	'click #speed-add': function(event){
		event.preventDefault();
		$('#newShopForm').toggle();
	}
});