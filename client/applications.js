Meteor.subscribe("shops");

Template.shop_table.helpers({
	shop: function () {  
		
		var shops = ShopList.find({}, {sort: {speed_down: -1}});

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
			latitude: Session.get('latitude_current'),
			longitude: Session.get('longitude_current')
		});

		template.find(".name").value = "";
		template.find(".cost").value = "";

      		// Prevent default form submit
      		return false;
      	}

      });

