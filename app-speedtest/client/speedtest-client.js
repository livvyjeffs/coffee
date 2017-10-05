console.log('**file: app-speedtest/client/speedtest-client.js loaded');

Session.set('SomApi_started',false);

Meteor.startup(function(){

	// SomApi.account = "SOM5500d2a408181";  //your API Key here //coffee-and-wifi.in
    SomApi.account = "SOM59d3f7b7bfa12"; //coffeeandwifi.in
    // SomApi.domainName = "coffee-and-wifi.in";  //your domain or sub-domain here 
    SomApi.domainName = "coffeeandwifi.meteorapp.com";
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
    // console.log('starting test from Meteor.startup in speedtest-client.js')
    // console.log(SomApi);

    SomApi.onError = function onError(error){
    	// alert('SpeedTest Error: see console');
     console.log(error);
     // Session.set('speedtestUp',888);
     // Session.set('speedtestDown',999);
 };

 SomApi.onTestCompleted = function onTestCompleted(testResult){

    console.log(testResult)

    Session.set('speedtestResult',testResult);
    Session.set('speedtestUp',testResult.upload);
    Session.set('speedtestDown',testResult.download);

    $('#speed-progress').text('');
    $('#speed-down').html('Your WiFi is ' + testResult.download + '<span class="down"></span> ' + testResult.upload + '<span class="up"></span> Mbps');
    $('#speed-add').show();

}

SomApi.onProgress = function onProgress(progress){

    Session.set('SomApi_started',true);

        // console.log(progress.percentDone + '% and current speed: ' + progress.currentSpeed + 'Mbps')

        $('#speed-progress').text(progress.percentDone + '% and current speed: ' + progress.currentSpeed + 'Mbps');

    }

});

Template.speedtest.events({
	'click #speed-add': function(event){
		event.preventDefault();
		Modal.show('new_shop');
	}
});