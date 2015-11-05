// <<<<<<< HEAD
Template.profilePage.helpers({
	tasks: function () {
 		return Tasks.find({host: {$in: [Meteor.user().username, Meteor.user().profile.name]}}, {sort: {createdAt: -1}});
	}
});
// =======
// Template.profilePage.helpers({
// 	tasks: function () {
//  		return Tasks.find({}, {sort: {createdAt: -1}});
// 	}
// });
// >>>>>>> dbc891e8d036c4d244479d9228a462dfc4e623f5
