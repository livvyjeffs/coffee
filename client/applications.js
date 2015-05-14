console.log('**file: client/application.js loaded');

Meteor.subscribe("shops");

Template.shop_table.helpers({
	shop: function () { 

	  //TODO - add a lat-long range limitation
	  //TODO - if none in the lat-long range, expand range search incrementally until "var=20" coffee_shops are popualted 

	  var shops = ShopList.find({shop_type: "coffee_shop"}, {sort: {speed_down: -1}});

	  return shops;

	}

});

Template.shopDocument.events({
	"click .subscribe": function(event, template){
		$("#subscribeModal").modal('show');
		
		//TODO - does "template" remember variables? Do I need to do a Session.set("") or can I use a local variable? A reactive variable?

		Session.set("desired_dataset",$(event.target).attr('data_type'));

	}
});


Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});

// Date Formatting for shop_documents

var DateFormats = {
	short: "DD MMMM YYYY",
	long: "dddd DD.MM.YYYY HH:mm"
};

UI.registerHelper("formatDate", function(datetime, format) {
	if (moment) {
		// can use other formats like 'lll' too
		format = DateFormats[format] || format;
		return moment(datetime).format(format);
	}
	else {
		return datetime;
	}
});

