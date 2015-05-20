Accounts.onCreateUser(function(options, user) {
	console.log('NEW USER CREATED' + user.username);
	// user.role = "registered";
	Roles.addUsersToRoles(user, ['standard']);
	return user;
});