Meteor.publish('shops',function(){
	return ShopList.find();
});