Meteor.subscribe("shops");

Template.shop_table.helpers({
	shop: function () {  

		// Creates a list of shops sorted by download speed
		
		var shops = ShopList.find({}, {sort: {speed_down: -1}});

		// vvvvvvvv PROBLEM HERE vvvvvvvv 
		// Starts the API Test - unsure whether or not it is ready though

		SomApi.startTest();

		// ^^^^^^^^ PROBLEM HERE ^^^^^^^^

		// When GoogleMaps is ready, it adds each shop to the map as a pin
		
		GoogleMaps.ready('exampleMap', function(map) {

			shops.forEach(function (theshop) {

				var latlng = new google.maps.LatLng(theshop.latitude, theshop.longitude);
				var shop_marker = new google.maps.Marker({
					position: latlng,
					map: map.instance
				});

			});

		});

		return shops;
	}
});


Template.new_shop.events({

	"click button": function (event, template) {

		// When the "add" button is clicked, a new coffee shop is added

		event.preventDefault();

		Session.set("name", template.find(".name").value);
		Session.set("cost", template.find(".cost").value);

		ShopList.insert({
			name: Session.get('name'),
			date: new Date(),
			speed_up: parseFloat(Session.get('speedtestResult').upload),
			speed_down: parseFloat(Session.get('speedtestResult').download),
			cost: parseInt(Session.get('cost')),
			latitude: Session.get('latitude'),
			longitude: Session.get('longitude')
		});

		template.find(".name").value = "";
		template.find(".cost").value = "";

      		// Prevent default form submit
      		return false;
      	}

      });

