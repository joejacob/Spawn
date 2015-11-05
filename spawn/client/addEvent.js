Template.addEvent.events({
    "submit form": function (event) {
    // This function is called when the new task form is submitted
    var eventName = event.target.eventName.value;
    var eventDescription = event.target.eventDescription.value;
    var eventVisibility = event.target.eventVisibility.value;
    var eventTime = event.target.eventTime.value;
    
    Tasks.insert({
      name: eventName,
      visibility: eventVisibility,
      description: eventDescription,
      time: eventTime,
      createdAt: new Date()
    });

    // Clear form
    event.target.eventName.value = "";
    event.target.eventDescription.value = "";

    // Prevent default form submit
    return false;
  }
  });

    Template.addEvent.helpers({
      tasks: function () {
        return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });