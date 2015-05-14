console.log('**file: app-speedtest/client/speedtest-client.js loaded');

Session.set('SomApi_started',false);

Meteor.startup(function(){

	// SomApi.account = "SOM5500d2a408181";  //your API Key here //coffee-and-wifi.in
    SomApi.account = "SOM55503fa398470"; //coffeeandwifi.in
    // SomApi.domainName = "coffee-and-wifi.in";  //your domain or sub-domain here 
    SomApi.domainName = "coffeeandwifi.in";
    SomApi.config.sustainTime = 2; 

    SomApi.config.testServerEnabled = true;
    SomApi.config.userInfoEnabled = true;
    SomApi.config.latencyTestEnabled = true;
    SomApi.config.uploadTestEnabled = true;
    SomApi.config.progress.enabled = true;
    SomApi.config.progress.verbose = true;

    //TODO - test at what time I should start the SomApi
    //WARNING - Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check http://xhr.spec.whatwg.org/.
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
		$('#addNewShop').modal('show');
	}
});