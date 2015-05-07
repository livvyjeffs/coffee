console.log('**file: app-maps/client/maps-client.js loaded');

Markers = new Mongo.Collection('markers'); 

Meteor.startup(function() {

  // get current position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

    //begin loading GoogleMaps
    GoogleMaps.load();


  //pull nearby shops
  shops = ShopList.find({}, {sort: {speed_down: -1}});

});

function getPosition(position) {
  Session.set('latitude_current', position.coords.latitude);
  Session.set('longitude_current', position.coords.longitude);

  console.log('navigator position: ' + position.coords.latitude + ', ' + position.coords.longitude)
}

Template.map.helpers({
  // This is a helper function, so it is a 'reactive computation'
  // Any time a Session variable inside it changes, the function surrounding it will run again
  // https://www.discovermeteor.com/blog/reactivity-basics-meteors-magic-demystified/
  exampleMapOptions: function() {

    if(GoogleMaps.loaded()){


      console.log('####### GOOGLE MAPS INITIALIZED at ' + Session.get('latitude_center') + ', ' + Session.get('longitude_center'));

       // Map initialization options
       return {
        center: new google.maps.LatLng(Session.get('latitude_center'), Session.get('longitude_center')),
        zoom: Session.get('zoom'),
        // mapTypeControl: true,
        // navigationControl: true,
        scrollwheel: false
      };
    }
  }
});

Template.map.onCreated(function() {  
  GoogleMaps.ready('exampleMap', function(map) {

    drawMap(map, Session.get('latitude_center'), Session.get('longitude_center'));

//     google.maps.event.addListener(map.instance, 'click', function(event) {
//       Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
//     });

//     var markers = {};

//     Markers.find().observe({  
//       added: function(document) {
//     // Create a marker for this document
//     var marker = new google.maps.Marker({
//       draggable: true,
//       animation: google.maps.Animation.DROP,
//       position: new google.maps.LatLng(document.lat, document.lng),
//       map: map.instance,
//       // We store the document _id on the marker in order 
//       // to update the document within the 'dragend' event below.
//       id: document._id
//     });

//     // This listener lets us drag markers on the map and update their corresponding document.
//     google.maps.event.addListener(marker, 'dragend', function(event) {
//       Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
//     });

//     // Store this marker instance within the markers object.
//     markers[document._id] = marker;
//   },
//   changed: function(newDocument, oldDocument) {
//     markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
//   },
//   removed: function(oldDocument) {

//     // Remove the marker from the map
//     markers[oldDocument._id].setMap(null);

//     // Clear the event listener
//     google.maps.event.clearInstanceListeners(
//       markers[oldDocument._id]);

//     // Remove the reference to this marker instance
//     delete markers[oldDocument._id];
//   }
// });

});
});

function drawMap(map, lat, lng){

  // GoogleMaps.ready(map, function(map) {

    console.log('map ready to be drawn');

    //hopefully the lat and lngs (which are hooked to session variables in implementation) will keep this reactive

    map.instance.setCenter(new google.maps.LatLng(lat,lng));

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

    console.log(shops);

    if(shops===undefined){
      console.log('Warning: shops list is undefined, will pull blank on map');
    }

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

  // });
}    




