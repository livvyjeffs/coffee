
function getPosition(position) {
  Session.set('latitude', position.coords.latitude);
  Session.set('longitude', position.coords.longitude);
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
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {

      // Map initialization options
      return {
        center: new google.maps.LatLng(Session.get('latitude'), Session.get('longitude')),
        zoom: 18,
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

