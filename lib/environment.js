// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

console.log('Tuesday May 12');

console.log('**file: lib/environment.js loaded');

ShopList = new Mongo.Collection("shops");


//when you are ready, read this
//http://www.manuel-schoebel.com/blog/iron-router-tutorial
//https://github.com/iron-meteor/iron-router

Router.route('/manage-users', function(){
	this.render('admin-tester');
});

Router.route('/', function () {
	this.render('mainlayout');

	Session.set('map_type','current_location');

	Session.set('zoom',15);
	Session.set('radius',1000);

});

Router.route('/bangkok', function (){
	//set bangkok gps coords
	this.render('mainlayout');

	Session.set('map_type','regional');

	Session.set('zoom', 11);
	Session.set('radius',10000);

	Session.set('regional',true);
	Session.set('region','bangkok');

	Session.set('latitude_center',13.741943);
	Session.set('longitude_center',100.548653);
	Session.set('setCenter',true);
});

Router.route('/beijing', function (){
	//set bangkok gps coords
	this.render('mainlayout');

	Session.set('map_type','regional');

	Session.set('zoom', 11);
	Session.set('radius',10000);
	
	Session.set('regional',true);
	Session.set('region','beijing');

	Session.set('latitude_center',39.903601);
	Session.set('longitude_center',116.387159);
	Session.set('setCenter',true);
});

kAdminConfig = {
	name: 'Your Admin',
	collections: {
		"Meteor.users": { 
			verbose: "Users",
			templates: { 
				"crud": { name: 'kAccountsAdminFluid' },
				"new": { name: 'yourCustomAdminCreateModule' }
			} 
		},
	}
}

kAccountsAdminConfig = {
	tableColumns: [
	{ label: 'Name', name: 'getName()' },
	{ label: 'Roles', name: 'getRoles()' },
	{ label: 'Account Type', name: 'getAccountType()' },
	{ label: 'Email', name: 'getEmail()' },
	]
}
