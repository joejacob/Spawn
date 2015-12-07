/*
TODO
- Make the tiemUntil counter change constantly
- make a timer for each event
- change color for each event as time goes down
- have event deleted from database 2 hours after event
*/

Template.addEvent.events({
  "submit form": function (event) {
    event.preventDefault();
    // This function is called when the new task form is submitted
    var eventName = event.target.eventName.value;
    var eventDescription = event.target.eventDescription.value;
    var eventVisibility = event.target.eventVisibility.value;
    var eventTime = event.target.eventTime.value;
    var eventAttendees = [{name: Meteor.user().profile.name, 
                           pic: Meteor.user().profile.picture, 
                           uid: Meteor.user()._id}];
    var eventLocation = Session.get('selectedLocation');
    var maxPart = event.target.maxPart.value;
    
      
    var currDate = new Date();
        
        // getting countdown time difference
        var currTime = parseInt(currDate.getHours())*3600 + parseInt(currDate.getMinutes())*60 + parseInt(currDate.getSeconds());
        var timeArr = eventTime.split(":");
        var eventTimeInt = parseInt(timeArr[0])*3600 + parseInt(timeArr[1])*60;  
        var timeUb = (currTime < eventTimeInt) ? (eventTimeInt - currTime) : (86400 - (currTime - eventTimeInt));  
      
    Tasks.insert({
          name: eventName,
          visibility: eventVisibility,
          description: eventDescription,
          time: eventTime,
          createdAt: new Date(),
          timeU: timeUb,
          host: Meteor.user().profile.name, 
          hostUid: Meteor.user()._id,
          attendees: eventAttendees,
          locationLatLng: eventLocation,
          numParticipants: maxPart
    }, function(err, _id) { 
            console.log("created event");
            Router.go('viewEvent', {_id: _id})}
    );
    
    // // Clear form
    // event.target.eventName.value = "";
    // event.target.eventDescription.value = "";

    // Prevent default form submit
    return false;
  }
});
