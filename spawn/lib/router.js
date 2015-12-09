Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    onBeforeAction: function (pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('landingPage');
      }
      this.next();
    }
    // waitOn: function() { return Meteor.subscribe('tasks'); }
});

Router.route('/splash', {
    name: 'landingPage'
});

Router.route('/', {
    name: 'eventsPage',
});

Router.route('/add', {
    name: 'addEvent',
    // data: function() { return {sessionid: this.params._sessionid}; }
});

Router.route('/event/:_id', {
    name: 'viewEvent',
    data: function () {
        return Tasks.findOne(this.params._id);
    }
});

Router.route('/prof/:_id', {
    name: 'profilePage',
    data: function () {
        return Meteor.users.findOne(this.params._id);
    }
});

/*var mustBeSignedIn = function(pause) {
    if(!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('landingPage');
        pause();
    }
};

var goToEventsPage = function(pause) {
    if(Meteor.user()) {
        Router.go('eventsPage');
        pause();
    }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['landingPage']});
Router.onBeforeAction(goToEventsPage, {only: ['landingPage']});*/