Accounts.onCreateUser(function(options, user) {

	user.profile = {};

	// user.role = "registered";
	Roles.addUsersToRoles(user, ['standard']);

	  // we wait for Meteor to create the user before sending an email
	  Meteor.setTimeout(function() {
	  	Accounts.sendVerificationEmail(user._id);
	  }, 2 * 1000);

	  return user;
	});	
