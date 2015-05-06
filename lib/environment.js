// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

ShopList = new Mongo.Collection("shops");

Router.route('/', function () {
	// this.render('theme');
});

Router.route('/bangkok', function (){
	//set bangkok gps coords
});

// Meteor.startup(function () {
//  console.log('looking for ip address')
//  console.log(UserStatus.connections.ipAddr);
// });