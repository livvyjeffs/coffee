Meteor.subscribe("shops");

Meteor.subscribe('theUsers');

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
	// passwordSignupFields: "USERNAME_ONLY"
	// https://github.com/ianmartorell/meteor-accounts-ui-bootstrap-3/
	// https://docs.meteor.com/#/full/accounts_ui_config
	passwordSignupFields: 'USERNAME_AND_EMAIL',
	extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'last-name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
    }]
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

Template.mainlayout.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.')
        }
      } else {
        console.log('Thank you! Your email address has been confirmed.')
      }
    });
  }
};
