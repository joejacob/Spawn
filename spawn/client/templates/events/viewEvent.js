Template.viewEvent.events({
	"click #joinEvent": function () {
		var me = Meteor.user().username || Meteor.user().profile.name;
		// console.log(Meteor.user().services.facebook)
		// console.log(Meteor.user());
		Tasks.update(this._id, {
        	$push: {attendees: {name: me, pic: Meteor.user().profile.picture, uid: Meteor.user()._id}}
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