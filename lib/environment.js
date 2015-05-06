// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

ShopList = new Mongo.Collection("shops");

Router.route('/', function () {
	//current coords
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

// Meteor.startup(function () {
//  console.log('looking for ip address')
//  console.log(UserStatus.connections.ipAddr);
// });