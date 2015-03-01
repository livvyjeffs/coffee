Shops = new Mongo.Collection("shops");

if (Meteor.isClient) {

  Meteor.subscribe("shops");

  Meteor.startup(function() {
    GoogleMaps.load();
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
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 12
      };
    }
  }
});

  Template.body.created = function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
};

Template.new_shop.events({
  "submit form": function (event, template) {
    event.preventDefault();
    Shops.insert({
      name: template.find(".name").value,
      date: new Date(),
      speed_up: template.find(".speed_up").value,
      speed_down: template.find(".speed_down").value,
      cost: template.find(".cost").value
    });

      // Clear form
      template.find(".name").value = "";
      template.find(".speed_up").value = "";
      template.find(".speed_down").value = "";
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