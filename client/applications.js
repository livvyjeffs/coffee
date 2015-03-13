Meteor.subscribe("shops");


Template.theme.helpers({
	shop: function () {  
		var shops = ShopList.find({}, {sort: {speed_down: -1}});
		
		GoogleMaps.ready('exampleMap', function(map) {

			shops.forEach(function (theshop) {

				console.log(theshop.latitude + ' ' + theshop.longitude);

				var latlng = new google.maps.LatLng(theshop.latitude, theshop.longitude);
				var shop_marker = new google.maps.Marker({
					position: latlng,
					map: map.instance
				});

			});

			
			SomApi.startTest();

		});

		return shops;
	}
});


Template.new_shop.events({
	"click button": function (event, template) {
		event.preventDefault();

		Session.set("name", template.find(".name").value);
		Session.set("cost", template.find(".cost").value);

		ShopList.insert({
			name: Session.get('name'),
			date: new Date(),
			speed_up: parseFloat(Session.get('speedtestResult').upload),
			speed_down: parseFloat(Session.get('speedtestResult').download),
  			// speed_up: 1,
  			// speed_down: 100,
  			cost: parseInt(Session.get('cost')),
  			latitude: Session.get('latitude'),
  			longitude: Session.get('longitude')
  		});

			// Meteor.call('createNewShopSpeed',function(err, data){
			// 	if(err){
			// 		console.log(err);
			// 	}else{
			// 		alert('success')
			// 	}

			// });

template.find(".name").value = "";
template.find(".cost").value = "";

      		// Prevent default form submit
      		return false;
      	}

      });

