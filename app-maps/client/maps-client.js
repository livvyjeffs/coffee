
function getPosition(position) {
  Session.set('latitude_current', position.coords.latitude);
  Session.set('longitude_current', position.coords.longitude);
}

Meteor.startup(function() {

  //begin loading GoogleMaps

  GoogleMaps.load();

  //get current position

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  //pull nearby shops

  shops = ShopList.find({}, {sort: {speed_down: -1}});

});

Template.map.helpers({
  exampleMapOptions: function() {

    if(Session.get('regional')){

      Session.set('zoom', 11);
      Session.set('radius',10000);

      if(Session.get('region')==='beijing'){
       Session.set('latitude_center',39.903601);
       Session.set('longitude_center',116.387159);
     }else if(Session.get('region')==='bangkok'){
       Session.set('latitude_center',13.741943);
       Session.set('longitude_center',100.548653);
     }
     
   }else{
    Session.set('zoom',15);
    Session.set('radius',1000);
    Session.set('latitude_center',Session.get('latitude_current'));
    Session.set('longitude_center',Session.get('longitude_current'));
  }

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {

      console.log('GoogleMaps loaded from template.map.helpers in maps-client')

      // Map initialization options
      return {
        center: new google.maps.LatLng(Session.get('latitude_center'), Session.get('longitude_center')),
        zoom: Session.get('zoom'),
        mapTypeControl: true,
        navigationControl: true,
        scrollwheel: false
      };
    }else{
      console.log('GoogleMaps NOT loaded from template.mpa.helpers');
    }
  }
});

Template.body.onCreated(function() {

  console.log('body created')

  GoogleMaps.ready('exampleMap', function(map) {

    console.log('google maps ready');

    var circleOptions = { 
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map.instance,
      center: new google.maps.LatLng(Session.get('latitude_current'), Session.get('longitude_current')),
      radius: Session.get('radius')
    };

    // Add the circle for this city to the map.
    var radius = new google.maps.Circle(circleOptions);

    shops.forEach(function (theshop) {

      console.log(theshop.name + ' ' + theshop.latitude + ' ' + theshop.longitude);

      var latlng = new google.maps.LatLng(theshop.latitude, theshop.longitude);
      var shop_marker = new google.maps.Marker({
        position: latlng,
        map: map.instance
      });

    });

    if(!Session.get('SomApi_started')){
      console.log('starting SomApi from inside GoogleMaps.ready in maps-client.js')
      SomApi.startTest();
    }

  });
});
Template.map.rendered = function() {
//on a slow connection this happens first

console.log('maps template rendered')

//often google maps hasn't quite loaded yet
console.log('Googlemaps ready: ' + GoogleMaps.loaded());

}

