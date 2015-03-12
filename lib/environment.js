// lib/                    # <- any common code for client/server. 
// lib/environment.js      # <- general configuration

ShopList = new Mongo.Collection("shops");

Router.map(function(){
	this.route('theme', {path: '/'});
});
