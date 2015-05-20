Meteor.methods({
  'chargeCard': function(stripeToken) {
    var Stripe = StripeAPI('sk_test_c174bb9naM8ixyev177azVpx');

    Stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      source: stripeToken
    }, function(err, charge) {
      console.log(err, charge);
    });
  }
});