Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'eventsPage'});

Router.route('/add', {
	name: 'addEvent',
	// data: function() { return {sessionid: this.params._sessionid}; }
});