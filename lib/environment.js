// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

// console.log('Tuesday May 12');

// console.log('**file: lib/environment.js loaded');

ShopList = new Mongo.Collection("shops");

ShopList.helpers({
	name() {
		return ShopList.findOne(this.name);
	}
});

Router.route('/', function () {

	Session.set('map_type','current_location');

	Session.set('zoom',15);
	Session.set('radius',1000);

});

Router.route('/mclean', function (){
	//set bangkok gps coords

	Session.set('map_type','regional');

	Session.set('zoom', 11);
	Session.set('radius',10000);

	Session.set('regional',true);
	Session.set('region','mclean');

	Session.set('latitude_center',38.9178065);
	Session.set('longitude_center',-77.16792219999999);
	Session.set('setCenter',true);

});

Router.route('/bangkok', function (){
	//set bangkok gps coords

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

	Session.set('map_type','regional');

	Session.set('zoom', 11);
	Session.set('radius',10000);
	
	Session.set('regional',true);
	Session.set('region','beijing');

	Session.set('latitude_center',39.903601);
	Session.set('longitude_center',116.387159);
	Session.set('setCenter',true);
});

Router.route('/princeton', function (){
	//set bangkok gps coords

	Session.set('map_type','regional');

	Session.set('zoom', 15);
	Session.set('radius',500);
	
	Session.set('regional',true);
	Session.set('region','princeton');

	Session.set('latitude_center',40.3428452);
	Session.set('longitude_center',-74.6568153);
	Session.set('setCenter',true);
});

Router.route('/boston', function (){
	//set bangkok gps coords

	Session.set('map_type','regional');

	Session.set('zoom', 15);
	Session.set('radius',5000);
	
	Session.set('regional',true);
	Session.set('region','boston');

	Session.set('latitude_center',42.361145);
	Session.set('longitude_center',-71.057083);
	Session.set('setCenter',true);
});


