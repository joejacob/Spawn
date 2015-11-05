Template.profilePage.helpers({
	tasks: function () {
 		return Tasks.find({}, {sort: {createdAt: -1}});
	}
});