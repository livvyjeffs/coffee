// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

console.log('**file: lib/environment.js loaded');

ShopList = new Mongo.Collection("shops");

Router.route('/', function () {
	//current coords
	Session.set('regional',false);

	Session.set('zoom',15);
	Session.set('radius',1000);

	Session.set('latitude_center', Session.get('latitude_current'));
	Session.set('longitude_center', Session.get('longitude_current'));
	
});

Router.route('/bangkok', function (){
	//set bangkok gps coords

	Session.set('zoom', 11);
	Session.set('radius',10000);

	Session.set('regional',true);
	Session.set('region','bangkok');

	Session.set('latitude_center',13.741943);
	Session.set('longitude_center',100.548653);

});

Router.route('/beijing', function (){
	//set bangkok gps coords

	Session.set('zoom', 11);
	Session.set('radius',10000);
	
	Session.set('regional',true);
	Session.set('region','beijing');

	Session.set('latitude_center',39.903601);
	Session.set('longitude_center',116.387159);
});
