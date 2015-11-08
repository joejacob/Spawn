Template.eventItem.helpers({

	eventSize: function () {
		if(this.attendees) {
			return this.attendees.length;
		}
		return 0;
	}
});