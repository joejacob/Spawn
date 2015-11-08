Template.viewEvent.events({
	"click #joinEvent": function () {
		var me = Meteor.user().username || Meteor.user().profile.name;
		Tasks.update(this._id, {
        	$push: {attendees: me}
      	});
	}
});
Template.viewEvent.helpers({
	// tasks: function () {
	// 	return Tasks.find({}, {sort: {createdAt: -1}});
	// }


	comments: function () {
		return EventComments.find({ event_id: this._id }, {sort: {createdAt: -1}});
	}


});