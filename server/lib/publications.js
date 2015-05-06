Meteor.publish('shops',function(){
	return ShopList.find();
});

// Meteor.publish("userStatus", function() {
//   return Meteor.users.find({ "status.online": true }, { });
// });