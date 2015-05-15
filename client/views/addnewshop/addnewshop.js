Template.new_shop.events({

	"change select": function (event, template){
		var newValue = $(event.target).val();
		switch(newValue){
			case 'hotel':
			$(template.find(".cost")).show();
			change_placeholder_text(template.find(".name"),"Hotel Name?");
			change_placeholder_text(template.find(".cost"),"Cost per Night?");
			break;
			case 'personal':
			change_placeholder_text(template.find(".name"),"What is this place?");
			$(template.find(".cost")).hide();
			break;
			case 'coffee_shop':
			$(template.find(".cost")).show();
			change_placeholder_text(template.find(".name"),"Coffee Shop Name?");
			change_placeholder_text(template.find(".cost"),"Cost per Medium Cappuccino?");
			break;
		}
		
	},"click button": function (event, template) {

// When the "add" button is clicked, a new coffee shop is added

event.preventDefault();

Session.set("name", template.find(".name").value);
Session.set("cost", template.find(".cost").value);
Session.set("shop_type", template.find("select").value);
Session.set("aircon", template.find(".aircon").value);
Session.set("vpn", template.find(".vpn").value);
Session.set("hours", template.find(".hours").value);
Session.set("currency", template.find(".currency").value);

ShopList.insert({
	shop_type: Session.get('shop_type'),
	name: Session.get('name'),
	date: new Date(),
	speed_up: parseFloat(Session.get('speedtestResult').upload),
	speed_down: parseFloat(Session.get('speedtestResult').download),
	cost: parseInt(Session.get('cost')),
	latitude: Session.get('latitude_current'),
	longitude: Session.get('longitude_current'),
	hours: Session.get('hours'),
	vpn: Session.get('vpn'),
	aircon: Session.get('aircon'),
	user: Meteor.userId()
});

template.find(".name").value = "";
template.find(".cost").value = "";
template.find(".aircon").value = "";
template.find(".vpn").value = "";
template.find(".hours").value = "";

$('#newShopForm').hide();

		// Prevent default form submit
		return false;
	}
	

});

function change_placeholder_text(elem,new_text){
	$(elem).attr("placeholder", new_text);
}

UI.registerHelper("add_shop_input", function(input_type, data_type, placeholder, options) {

	//TODO - use jquery to create documents

});