Meteor.subscribe("shops");

// var allShops = ShopList.find();  //eventually limit this to only shops nearby

// Template.shops.helpers({
//   'shop': function(){
//     return ShopList.find();
//   }
// });

Template.theme.helpers({
  shop: function () {  
    return ShopList.find({}, {sort: {createdAt: -1}});
  }
});


// Template.new_shop.events({
//   "submit form": function (event, template) {
//     event.preventDefault();

//     SomApi.onTestCompleted = function(){
//       Shops.insert({
//         name: Session.get('name'),
//         date: new Date(),
//         speed_up: Session.get('speedtestResult').upload,
//         speed_down: Session.get('speedtestResult').download,
//         cost: Session.get('cost'),
//         latitude: Session.get('latitude'),
//         longitude: Session.get('longitude')
//       });
//     }

//     SomApi.startTest();

//     Session.set("name", template.find(".name").value);
//     Session.set("cost", template.find(".cost").value);

//       // Clear form
//       template.find(".name").value = "";
//       template.find(".cost").value = "";

//       // Prevent default form submit
//       return false;
//     }

//   });

