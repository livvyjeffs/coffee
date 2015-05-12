// server/lib/environment.js   # <- configuration of server side packages

// Meteor.startup(function () {

// 	ipAddress = UserStatus.connections.ipAddr;

// });

// server
Meteor.publish("userData", function () {
  // if (this.userId) {
    return Meteor.users.find();
  // } else {
  //   this.ready();
  // }
});
