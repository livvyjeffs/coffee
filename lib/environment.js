// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

console.log('Friday May 7')

console.log('**file: lib/environment.js loaded');

ShopList = new Mongo.Collection("shops");


Router.route('/', function () {

	Session.set('map_type','current_location');

	Session.set('zoom',15);
	Session.set('radius',1000);

	//Session.set('latitude_center', Session.get('latitude_current'));
	//Session.set('longitude_center', Session.get('longitude_current'));
	//TODO - The above lines of code trigger this error on autorun when 'longitude_current' is changed
	//WARNING - Route dispatch never rendered. Did you forget to call this.next() in an onBeforeAction?
	
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
