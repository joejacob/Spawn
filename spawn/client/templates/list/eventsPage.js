Template.eventsPage.helpers({
	tasks: function () {
        var d = new Date();
        
        // current time
        var secondsDate = d.getTime()/100;
        
        // event timw
        
		return Tasks.find({}, {sort: {timeUntil: 1}});
	}
});