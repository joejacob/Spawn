Template.addEvent.events({
  "submit form": function (event) {
    // This function is called when the new task form is submitted
    var eventName = event.target.eventName.value;
    var eventDescription = event.target.eventDescription.value;
    var eventVisibility = event.target.eventVisibility.value;
    var eventTime = event.target.eventTime.value;
    var eventAttendees = [{name: Meteor.user().username || Meteor.user().profile.name, pic: Meteor.user().profile.picture, uid: Meteor.user()._id}];
    
    Tasks.insert({
      name: eventName,
      visibility: eventVisibility,
      description: eventDescription,
      time: eventTime,
      createdAt: new Date(),
      host: Meteor.user().username || Meteor.user().profile.name,
      attendees: eventAttendees
    });
      
    // // Clear form
    // event.target.eventName.value = "";
    // event.target.eventDescription.value = "";
    Router.go('eventsPage');

    // Prevent default form submit
    return false;
  }
});