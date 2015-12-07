/*
TODO:
    - add search bar to search for events by name, host
*/

Template.eventsPage.helpers({
	tasks: function () {
		  return Tasks.find({}, {sort: {timeUntil: 1}});
	}
});