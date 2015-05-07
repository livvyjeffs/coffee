console.log('**file: app-maps/client/maps-client.js loaded');

Markers = new Mongo.Collection('markers'); 

var map_initialized = false;

var timer_counts = {
  map_intialize: 0,
  map_populate: 0,
  coordinate: 0,
};

// var mapInitializeTimer = setInterval(initializeMap, 500);
// var populateTimer = setInterval(populateMaps, 2000);
// var displayCoordTimer = setInterval(checkDisplayCoords, 500);

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
  // This is a helper function, so it is a 'reactive composition'
  // Any time a Session variable inside it changes, the function surrounding it will run again
  // https://www.discovermeteor.com/blog/reactivity-basics-meteors-magic-demystified/
  exampleMapOptions: function() {

    if(GoogleMaps.loaded()){

      map_initialized = true;

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

    google.maps.event.addListener(map.instance, 'click', function(event) {
      Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });

    var markers = {};

    Markers.find().observe({  
      added: function(document) {
    // Create a marker for this document
    var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.lat, document.lng),
      map: map.instance,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });

    // This listener lets us drag markers on the map and update their corresponding document.
    google.maps.event.addListener(marker, 'dragend', function(event) {
      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
    });

    // Store this marker instance within the markers object.
    markers[document._id] = marker;
  },
  changed: function(newDocument, oldDocument) {
    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
  },
  removed: function(oldDocument) {

    // Remove the marker from the map
    markers[oldDocument._id].setMap(null);

    // Clear the event listener
    google.maps.event.clearInstanceListeners(
      markers[oldDocument._id]);

    // Remove the reference to this marker instance
    delete markers[oldDocument._id];
  }
});

});
});

function populateMaps() {
  if(map_initialized){
    clearInterval(populateTimer);
    drawMap('exampleMap',Session.get('regional'),Session.get('region'));
  }else if(timer_counts.map_populate > 5){
    console.log('END: map population timed out');
    clearInterval(populateTimer);
  }else{
    timer_counts.map_populate++;
    console.log('//////// This map has not been initialized yet.');
  }

}

function checkDisplayCoords(){
  if(Session.get('regional')!==undefined){
    clearInterval(displayCoordTimer);
    setDisplayCoordinates(Session.get('regional'), Session.get('region'));
  }else if(timer_counts.coordinate>5){
    console.log('END: coordinates timed out');
    clearInterval(displayCoordTimer);
  }else{
    timer_counts.coordinate++;
    console.log('//////// Regional Coords not Set Try Again in 0.5s');
  }
}

function setDisplayCoordinates(regional, region){
  if(regional){

    Session.set('zoom', 11);
    Session.set('radius',10000);

    if(region==='beijing'){
     Session.set('latitude_center',39.903601);
     Session.set('longitude_center',116.387159);
   }else if(region==='bangkok'){
     Session.set('latitude_center',13.741943);
     Session.set('longitude_center',100.548653);
   }

 }else{
  // Session.set('zoom',15);
  // Session.set('radius',1000);

 //  if(Session.get('latitude_current') === undefined){
 //    //if unknown set to Saskatchewan, Canada
 //    Session.set('latitude_center',55.707526);
 //    Session.set('longitude_center',-105.476872);
 //    console.log('current location unknown');
 //  }else{
 //   Session.set('latitude_center',Session.get('latitude_current'));
 //   Session.set('longitude_center',Session.get('longitude_current'));
 // }

 
}
}

function drawMap(map){

  // GoogleMaps.ready(map, function(map) {

    console.log('map ready to be drawn');

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




