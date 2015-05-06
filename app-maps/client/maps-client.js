
function getPosition(position) {
  Session.set('latitude_current', position.coords.latitude);
  Session.set('longitude_current', position.coords.longitude);
}

Meteor.startup(function() {

  GoogleMaps.load();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

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

      // Map initialization options
      return {
        center: new google.maps.LatLng(Session.get('latitude_center'), Session.get('longitude_center')),
        zoom: Session.get('zoom'),
        mapTypeControl: true,
        navigationControl: true,
        scrollwheel: false
      };
    }
  }
});

Template.map.rendered = function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.

  console.log('google maps rendered')

  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready

    console.log('google maps ready')
    
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });

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

    var shops = ShopList.find({}, {sort: {speed_down: -1}});

    console.log(shops);

    shops.forEach(function (theshop) {

      console.log(theshop.latitude + ' ' + theshop.longitude);

      var latlng = new google.maps.LatLng(theshop.latitude, theshop.longitude);
      var shop_marker = new google.maps.Marker({
        position: latlng,
        map: map.instance
      });

    });

    SomApi.startTest();

  });

}

