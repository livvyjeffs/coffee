console.log('**file: app-maps/client/maps-client.js loaded');

Markers = new Mongo.Collection('markers'); 

var map_draw_count = 0;

Meteor.startup(function() {

  // get current position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  //begin loading GoogleMaps
  GoogleMaps.load();

  // //pull all shops
  // shops = ShopList.find({}, {sort: {speed_down: -1}}, function(err,docs){
  //   alert('shops loaded')
  //   // GoogleMaps.ready('exampleMap', function(map) {

  //   //   docs.forEach(function (theshop) {

  //   //     console.log(theshop.name + ' ' + theshop.latitude + ' ' + theshop.longitude);

  //   //     var latlng = new google.maps.LatLng(theshop.latitude, theshop.longitude);
  //   //     var shop_marker = new google.maps.Marker({
  //   //       position: latlng,
  //   //       map: map.instance
  //   //     });

  //   //   });
  //   // });
  // });

});

Tracker.autorun(function () {
  var lat = Session.get('latitude_current');
  var lng = Session.get('longitude_current');
  console.log('Autorun is auto-running!' + lat + ', ' + lng);
  if(GoogleMaps.loaded()){
    GoogleMaps.ready('exampleMap', function(map) {
      console.log('Autorun is centering the map')
      centerMap(map, Session.get('latitude_center'), Session.get('longitude_center'));
    });
  }
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
  currentLocation: function(){
    return !! Session.get('latitude_current')
  },exampleMapOptions: function() {

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

    drawMap(map);
    
    centerMap(map, Session.get('latitude_center'), Session.get('longitude_center'));

  });
});

function centerMap(map, lat, lng){
  console.log('centering map at ' + lat + ', ' + lng);
  //hopefully the lat and lngs (which are hooked to session variables in implementation) will keep this reactive
  map.instance.setCenter(new google.maps.LatLng(lat,lng));
  console.log('NEW LAT LONG: ' + lat + ', ' + lng);

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

  }

  function drawMap(map){

    map_draw_count++;

  // GoogleMaps.ready(map, function(map) {

    console.log(map_draw_count + ': map ready to be drawn');

    var shops = ShopList.find({}, {sort: {speed_down: -1}});

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




