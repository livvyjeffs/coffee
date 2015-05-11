
console.log('**file: app-subscribe/client/subscribe-client.js loaded');

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


Template.subscribe.helpers({


});
