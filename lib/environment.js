// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

console.log('**file: lib/environment.js loaded');

ShopList = new Mongo.Collection("shops");

Router.route('/', function () {
	//current coords
	Session.set('regional',false);
});

Router.route('/bangkok', function (){
	//set bangkok gps coords
	Session.set('regional',true);
	Session.set('region','bangkok');

});

Router.route('/beijing', function (){
	//set bangkok gps coords
	Session.set('regional',true);
	Session.set('region','beijing');
});
