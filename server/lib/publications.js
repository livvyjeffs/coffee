console.log('**file: server/lib/publications.js loaded');


Meteor.publish('shops',function(){
	return ShopList.find();
});

// Meteor.publish("userStatus", function() {
//   return Meteor.users.find({ "status.online": true }, { });
// });