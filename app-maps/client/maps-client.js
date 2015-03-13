
function getPosition(position) {
  Session.set('latitude', position.coords.latitude);
  Session.set('longitude', position.coords.longitude);
}

Meteor.startup(function() {

  // $(body).addClass('index');
  // $(body).attr("id","page-top");

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
     console.log('googlemaps loaded')
      // Map initialization options
      return {
        center: new google.maps.LatLng(Session.get('latitude'), Session.get('longitude')),
        zoom: 11,
        mapTypeControl: true,
        navigationControl: true,
        scrollwheel: false
      };
    }
  }
});

Template.map.rendered = function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready

    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });

  });
}

