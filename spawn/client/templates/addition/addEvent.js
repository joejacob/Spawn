/*
TODO
- Make the tiemUntil counter change constantly
- make a timer for each event
- change color for each event as time goes down
- have event deleted from database 2 hours after event
*/
Template.addEvent.events({
  "submit form": function (event) {
    // This function is called when the new task form is submitted
    var eventName = event.target.eventName.value;
    var eventDescription = event.target.eventDescription.value;
    var eventVisibility = event.target.eventVisibility.value;
    var eventTime = event.target.eventTime.value;
    var eventAttendees = [{name: Meteor.user().profile.name, 
                           pic: Meteor.user().profile.picture, 
                           uid: Meteor.user()._id}];
    
    // getting timeUntil
    var currDate = new Date();
    var currTime = parseInt(currDate.getHours())*3600 + parseInt(currDate.getMinutes())*60 + parseInt(currDate.getSeconds());
    var timeArr = eventTime.split(":");
    var eventTimeInt = parseInt(timeArr[0])*3600 + parseInt(timeArr[1])*60;  
    var timeU = (currTime < eventTimeInt) ? (eventTimeInt - currTime) : (86400 - (currTime - eventTimeInt));
    
    // convert 24-hour time to 12-hour time
    var suffix = (timeArr[0] >= 12)? 'pm' : 'am';
    var eHours = (timeArr[0] > 12)? timeArr[0] -12 : timeArr[0];
    var eHours = (eHours == '00')? 12 : eHours;  
    var eventTime = eHours + ":" + timeArr[1] + suffix 
      
    Tasks.insert({
      name: eventName,
      visibility: eventVisibility,
      description: eventDescription,
      time: eventTime,
      timeUntil: timeU,
      createdAt: new Date(),
      host: Meteor.user().profile.name, 
      hostUid: Meteor.user()._id,
      attendees: eventAttendees
    });
    console.log(event)
    // // Clear form
    // event.target.eventName.value = "";
    // event.target.eventDescription.value = "";
    Router.go('eventsPage');

    // Prevent default form submit
    return false;
  }
});