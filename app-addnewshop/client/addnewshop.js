Template.new_shop.events({

	"click .btn-success": function (event, template) {

	// When the "add" button is clicked, a new coffee shop is added

	event.preventDefault();
	console.log('adding new shop...')

	Session.set("name", template.find(".name").value);
	Session.set("cost", template.find(".cost").value);
	Session.set("shop_type", template.find("select").value);
	Session.set("hours", template.find(".hours").value);
	Session.set("currency", template.find(".currency").value);

	Session.set("aircon", false);
	Session.set("vpn", false);
	Session.set("wifirestrict", false);

	if ($('.vpn').is(':checked')) {
		Session.set("vpn", true);
	}

	if ($('.aircon').is(':checked')) {
		Session.set("aircon", true);

	}

	if ($('.wifirestrict').is(':checked')) {
		Session.set("wifirestrict", true);
	}

	ShopList.insert({
		shop_type: Session.get('shop_type'),
		name: Session.get('name'),
		date: new Date(),
		speed_up: parseFloat(Session.get('speedtestUp')),
		speed_down: parseFloat(Session.get('speedtestDown')),
		cost: parseFloat(Session.get('cost')),
		latitude: Session.get('latitude_current'),
		longitude: Session.get('longitude_current'),
		hours: Session.get('hours'),
		vpn: Session.get('vpn'),
		aircon: Session.get('aircon'),
		wifirestrict: Session.get('wifirestrict')
		// user: Meteor.userId()
	});

	template.find(".name").value = "";
	template.find(".cost").value = "";
	template.find(".aircon").value = "";
	template.find(".vpn").value = "";
	template.find(".wifirestrict").value = "";
	template.find(".hours").value = "";

	Modal.hide('new_shop');

		// Prevent default form submit
		return false;
	},
	"change select": function (event, template){
		var newValue = $(event.target).val();
		switch(newValue){
			case 'hotel':
			$(template.find(".cost")).show();
			$('.name').attr("placeholder","Hotel Name?");
			$('.cost').attr("placeholder","Cost per Night?");
			break;
			case 'personal':
			$('.name').attr("placeholder","What is this place?");
			$(template.find(".cost")).hide();
			$(template.find(".currency")).hide();
			break;
			case 'coffee_shop':
			$(template.find(".cost")).show();
			$(template.find(".hours")).hide();
			$('.name').attr("placeholder","Coffee Shop Name?");
			$('.cost').attr("placeholder","Cost per Medium Cappuccino?");
			break;
		}
		
	}

});

Template.new_shop.helpers({
	speed_down: function() {
		return Session.get('speedtestDown');
	}
});