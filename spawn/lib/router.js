Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	// waitOn: function() { return Meteor.subscribe('tasks'); }
});

Router.route('/', {name: 'eventsPage'});

Router.route('/add', {
	name: 'addEvent',
	// data: function() { return {sessionid: this.params._sessionid}; }
});

Router.route('/event/:_id', {
	name: 'viewEvent',
	data: function() { return Tasks.findOne(this.params._id); }
});