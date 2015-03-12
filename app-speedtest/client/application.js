Meteor.startup(function() {


});

Template.speedtest.rendered = function(template){

		SomApi.account = "SOM5500d2a408181";  //your API Key here
    SomApi.domainName = "bangkok-coffee-shops.meteor.com";  //your domain or sub-domain here 
    SomApi.config.sustainTime = 4; 

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
    	$('#speed-down').text('Your WiFi Speed is ' + testResult.download + ' DOWN and ' + testResult.upload + 'UP Mbps');
    	$('#speed-add').show();

    }

    SomApi.onProgress = function onProgress(progress){

    	$('#speed-progress').text(progress.percentDone + '% and current speed: ' + progress.currentSpeed + 'Mbps');

    }

    SomApi.startTest();

}