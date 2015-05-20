Meteor.startup(function() {
	
    Stripe.setPublishableKey('pk_test_KI822GZD6zYVQkGbZVkjw132');

    var handler = StripeCheckout.configure({
        key: 'pk_test_KI822GZD6zYVQkGbZVkjw132',
        token: function(token) {}
    });
    
});

// ccNum = $('#ccnum').val();
// cvc = $('#cvc').val();
// expMo = $('#exp-month').val();
// expYr = $('#exp-year').val();

// Stripe.card.createToken({
//     number: ccNum,
//     cvc: cvc,
//     exp_month: expMo,
//     exp_year: expYr,
// }, function(status, response) {
//     stripeToken = response.id;
//     Meteor.call('chargeCard', stripeToken);
// });