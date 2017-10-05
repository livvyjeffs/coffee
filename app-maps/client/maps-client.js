console.log('**file: app-maps/client/maps-client.js loaded');

Meteor.startup(function() {

  //   default positions
  //   Session.set('latitude_current', 38.9178065);
  //   Session.set('longitude_current', -77.16792219999999);

  //begin loading GoogleMaps
  GoogleMaps.load({
    key: 'AIzaSyA7B1nxBvb_HoEQqe7lb2EXqRvUzQvpbQM'
  });

  if (navigator.geolocation) {
    console.log('// ' + 'on Meteor.startup(), getting position');
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }


});

var getPosition_count = 0;

function getPosition(position) {
  getPosition_count++;
  console.log(getPosition_count+': getPosition run');

  console.log(position.coords)

  if(position.coords.latitude===undefined){
    alert('unable to access location');
  }else{
    Session.set('latitude_current', position.coords.latitude);
    Session.set('longitude_current', position.coords.longitude);
  }

  setCenter(Session.get('map_type'));

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
    console.log('Template.map.helpers({setCenter');
    console.log(!! Session.get('setCenter'));
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
  },
  // the posts cursor
  shops: function () {
    return Template.instance().shops();
  },
  // the subscription handle
  isReady: function () {
    return Template.instance().ready.get();
  },
  // are there more posts to show?
  hasMoreShops: function () {
    return Template.instance().posts().count() >= Template.instance().limit.get();
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

Template.map.onCreated(function () {

  // The tutorial link below:
  // https://www.discovermeteor.com/blog/template-level-subscriptions/

  // 1. Initialization
  
  var instance = this;

  // initialize the reactive variables
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(5);
  instance.ready = new ReactiveVar(false);
  
  // 2. Autorun
  
  // will re-run when the "limit" reactive variables changes
  this.autorun(function () {

    // get the limit
    var limit = instance.limit.get();

    console.log("Asking for "+limit+" shops...")
    
    // subscribe to the posts publication
    var subscription = Meteor.subscribe('shops', limit);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      console.log("> Received "+limit+" shops. \n\n")
      instance.loaded.set(limit);
      instance.ready.set(true);
    } else {
      instance.ready.set(false);
      console.log("> Subscription is not ready yet. \n\n");
    }
  });
  
  // 3. Cursor
  
  instance.shops = function() { 
    return ShopList.find({}, {limit: instance.loaded.get()});
  }
  
});