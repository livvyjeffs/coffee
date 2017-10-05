Template.shops.helpers({
	shops() {
		return ShopList.find({
			"$or": [{
				"shop_type": "coffee_shop"
			}, {
				"shop_type": "hotel"
			}]
		});
	},
});