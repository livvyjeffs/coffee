Shops = new Mongo.Collection("shops");

function getPosition(position) {
  Session.set('latitude', position.coords.latitude);
  Session.set('longitude', position.coords.longitude);
}


var allShops = Shops.find();  //eventually limit this to only shops nearby


if (Meteor.isClient) {

  Meteor.subscribe("shops");

  Meteor.startup(function() {
    GoogleMaps.load();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    SomApi.account = "SOM5500d2a408181";  //your API Key here
SomApi.domainName = "bangkok-coffee-shops.meteor.com";  //your domain or sub-domain here 
SomApi.config.sustainTime = 4; 
SomApi.onError = function onError(error){
  console.log(error);
};

SomApi.config.sustainTime = true;
SomApi.config.testServerEnabled = true;
SomApi.config.userInfoEnabled = true;
SomApi.config.latencyTestEnabled = true;
SomApi.config.uploadTestEnabled = true;
SomApi.config.progress.enabled = true;
SomApi.config.progress.verbose = true;

});

  var DateFormats = {
    short: "DD MMMM YYYY",
    long: "dddd DD.MM.YYYY HH:mm"
  };

  UI.registerHelper("formatDate", function(datetime, format) {
    if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});

  Template.body.helpers({
    shops: function () {  
      return Shops.find({}, {sort: {createdAt: -1}});
    },
    exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(Session.get('latitude'), Session.get('longitude')),
        zoom: 12
      };
    }
  }
});


  Template.body.rendered = function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });

    allShops.forEach(function (shop) {
      var latlng = new google.maps.LatLng(shop.latitude, shop.longitude);
      var shop_marker = new google.maps.Marker({
        position: latlng,
        map: map.instance
      });
    });

  });


};

Template.new_shop.events({
  "submit form": function (event, template) {
    event.preventDefault();

    SomApi.startTest();

    var testUp, testDown;


    Session.set("name", template.find(".name").value);
    Session.set("cost", template.find(".cost").value);

    SomApi.onTestCompleted = function onTestCompleted(testResult){
      // testUp = testResult.upload;
      // testDown = testResult.download;
      // Session.set("upload", testResult.upload);
      // Session.set("download", testResult.download);

      Shops.insert({
        name: Session.get('name'),
        date: new Date(),
        speed_up: testResult.upload,
        speed_down: testResult.download,
        cost: Session.get('cost'),
        latitude: Session.get('latitude'),
        longitude: Session.get('longitude')
      });

    }



    SomApi.onProgress = function onProgress(progress){

      // console.log('current speed: ' + progress.currentSpeed);

    }

      // Clear form
      template.find(".name").value = "";
      // template.find(".speed_up").value = "";
      // template.find(".speed_down").value = "";
      template.find(".cost").value = "";

      // Prevent default form submit
      return false;
    }

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
