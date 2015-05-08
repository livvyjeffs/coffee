console.log('**file: app-maps/client/maps-client.js loaded');

Meteor.startup(function() {

  // get current position
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
    //TODO: change them to /bangkok in iron router
  }

  //begin loading GoogleMaps
  GoogleMaps.load();

});

var getPosition_count = 0;

function getPosition(position) {
  getPosition_count++;
  console.log(getPosition_count+': getPosition run');

  if(position===undefined){
    alert('navigator unknown');
  }else{
    Session.set('latitude_current', position.coords.latitude);
    Session.set('longitude_current', position.coords.longitude);
    setCenter(Session.get('map_type'));
  }

}

function setCenter(map_type){

  switch(map_type){
    case 'current_location':
    Session.set('latitude_center', Session.get('latitude_current'));
    Session.set('longitude_center', Session.get('longitude_current'));
    Session.set('setCenter',true); //triggers map render
    break;
    case 'regional':
    //set value to according to json list
    //for cheats this is done in controller for now
    break;
  }

}

Template.map.helpers({

  // This is a helper function, so it is a 'reactive computation'
  // Any time a Session variable inside it changes, the function surrounding it will run again
  // https://www.discovermeteor.com/blog/reactivity-basics-meteors-magic-demystified/

  setCenter: function(){
    //in a few days from May 4 GoogleMaps from dburles may have the ability to be reactive. Until then this is the way.
    //if the center is known, render the map
    return !! Session.get('setCenter')
  },exampleMapOptions: function() {

    if(GoogleMaps.loaded()){

      console.log('####### GOOGLE MAPS INITIALIZED at ' + Session.get('latitude_center') + ', ' + Session.get('longitude_center'));

       // Map initialization options
       return {
        //when this becomes reactive, any change in 'latitude_center' will change the map center
        center: new google.maps.LatLng(Session.get('latitude_center'), Session.get('longitude_center')),
        zoom: Session.get('zoom'),
        mapTypeControl: true,
        navigationControl: true,
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
  // console.log('centering map at ' + lat + ', ' + lng);
  //hopefully the lat and lngs (which are hooked to session variables in implementation) will keep this reactive
  // map.instance.setCenter(new google.maps.LatLng(lat,lng));
  // console.log('NEW LAT LONG: ' + lat + ', ' + lng);

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

  var map_draw_count = 0;

  function drawMap(map){

    map_draw_count++;

  // GoogleMaps.ready(map, function(map) {

    console.log(map_draw_count + ': drawMap');

    var shops = ShopList.find({}, {sort: {speed_down: -1}});

    shops.forEach(function (theshop) {

      // console.log(theshop.name + ' ' + theshop.latitude + ' ' + theshop.longitude);

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




