console.log('**file: app-speedtest/client/speedtest-client.js loaded');

Session.set('SomApi_started',false);

Meteor.startup(function(){

	SomApi.account = "SOM5500d2a408181";  //your API Key here
    SomApi.domainName = "coffee-and-wifi.in";  //your domain or sub-domain here 
    SomApi.config.sustainTime = 2; 

    SomApi.config.testServerEnabled = true;
    SomApi.config.userInfoEnabled = true;
    SomApi.config.latencyTestEnabled = true;
    SomApi.config.uploadTestEnabled = true;
    SomApi.config.progress.enabled = true;
    SomApi.config.progress.verbose = true;

    // SomApi.startTest();

    console.log('starting test from Meteor.startup in speedtest-client.js')
    console.log(SomApi);

    SomApi.onError = function onError(error){
    	alert('error: see console');
    	console.log(error);
    };

    SomApi.onTestCompleted = function onTestCompleted(testResult){

    	Session.set('speedtestResult',testResult);

    	$('#speed-progress').text('');
    	$('#speed-down').html('Your WiFi is ' + testResult.download + '<span class="down"></span> ' + testResult.upload + '<span class="up"></span> Mbps');
    	$('#speed-add').show();

    }

    SomApi.onProgress = function onProgress(progress){

        Session.set('SomApi_started',true);

    	$('#speed-progress').text(progress.percentDone + '% and current speed: ' + progress.currentSpeed + 'Mbps');

    }

});

Template.speedtest.events({
	'click #speed-add': function(event){
		event.preventDefault();
		$('#newShopForm').toggle();
	}
});