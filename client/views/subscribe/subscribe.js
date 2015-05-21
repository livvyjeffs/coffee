
console.log('**file: app-subscribe/client/subscribe-client.js loaded');


Template.subscribe.helpers({

// Session.get("desired_dataset")

//TODO - how do I add attributes to a user? Like has or hasn't paid for a certain subscription? How many times has contributed?

});

Template.subscribe.events({
	"click button.purchase": function(event, template){
		
	},
	'submit form': function (e, template) {
		e.preventDefault();
	  // make sure there is a Meteor.user() or wrap the following inside the Meteor.createUser callback function
	  var easy = StripeEasy.submitHelper(e);
	  var plan_id = "monthly"; // set however you want, via Session variable or a part of the form.
	  StripeEasy.subscribe(easy, plan_id, function(err, result){
	  	if(err){
	  		console.log(err)
	      Session.set('stripeEasyError', err); // show error to user
	  }else{
	  	console.log('paymet success!')
	  	console.log(result);

	  	$(template).find('status').text("You've purchased the dataset, thank you!");
	  	Meteor.call('addSubscription', Meteor.userId(), ['subscribed'], function() {
	  		console.log(Meteor.user().username + ' is now subscribed');
	  	});
	  }
	    // if no error, will return the newly created customer object from Stripe
	});
	}
});
