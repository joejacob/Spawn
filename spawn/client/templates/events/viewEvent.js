Template.viewEvent.helpers({
	// tasks: function () {
	// 	return Tasks.find({}, {sort: {createdAt: -1}});
	// }
	comments: function () {
		return EventComments.find({ event_id: this._id }, {sort: {createdAt: -1}});
	}
});