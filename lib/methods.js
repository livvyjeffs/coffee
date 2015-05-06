  Meteor.methods({
  	'createNewShopSpeed': function(){
  		console.log(Session.get('name'));
  		console.log(Session.get('latitude'));
  		console.log(Session.keys)
  		ShopList.insert({
  			name: Session.get('name'),
  			date: new Date(),
  			speed_up: Session.get('speedtestResult').upload,
  			speed_down: Session.get('speedtestResult').download,
  			// speed_up: 1,
  			// speed_down: 100,
  			cost: Session.get('cost'),
  			latitude: Session.get('latitude'),
  			longitude: Session.get('longitude')
  		});
  	}
  });

  Meteor.methods({

    'getIP': function(){
      console.log('getting addresss')
      console.log(ipAddress);
      // return ipAddress;
    }

  });

