
console.log('**file: app-subscribe/client/subscribe-client.js loaded');


Template.subscribe.helpers({

// Session.get("desired_dataset")

//TODO - how do I add attributes to a user? Like has or hasn't paid for a certain subscription? How many times has contributed?

});

Template.subscribe.events({
	"click button.purchase": function(event, template){

		$(template).find('status').text("You've purchased the dataset, thank you!");

		// ccNum = $('#ccnum').val();
		// cvc = $('#cvc').val();
		// expMo = $('#exp-month').val();
		// expYr = $('#exp-year').val();

		// Stripe.card.createToken({
		// 	number: ccNum,
		// 	cvc: cvc,
		// 	exp_month: expMo,
		// 	exp_year: expYr,
		// }, function(status, response) {
		// 	stripeToken = response.id;
		// 	Meteor.call('chargeCard', stripeToken);
		// });

		// Stripe.charges.create({
		// 	amount: 1000,
		// 	currency: "USD",
		// 	card: {
		// 		number: "4242424242424242",
		// 		exp_month: "03",
		// 		exp_year: "2014"
		// 	}
		// }, function (err, res) {
		// 	console.log(err, res);
		// });

		Meteor.call('addSubscription', Meteor.userId(), ['subscribed'], function() {
			console.log(Meteor.user().username + ' is now subscribed');
		});

	}
});
