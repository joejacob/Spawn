if (Meteor.isClient) {    
	Template.login.events({
		'click #facebook-login': function(event) {
			Meteor.loginWithFacebook({}, function(err){
				if (err) {
					throw new Meteor.Error("Facebook login failed");
				}
			});
		},

		'click #logout': function(event) {
			Meteor.logout(function(err){
				if (err) {
					throw new Meteor.Error("Logout failed");
				}
			})
		}
	});
// This code only runs on the client
    Meteor.subscribe("tasks");

    Template.body.helpers({
    	tasks: function () {
      // Show newest tasks first
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
    }
},
hideCompleted: function () {
	return Session.get("hideCompleted");
},
countTasks: function() {
	return (Tasks.find({checked: {$ne: false}}).count());
}
});

    Template.body.events({
    	"submit .new-task": function (event) {
      // This function is called when the new task form is submitted

      var text = event.target.text.value;

      Meteor.call("addTask",text);

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
  },
  "change .hide-completed input": function (event) {
  	Session.set("hideCompleted", event.target.checked);
  }
});

    Template.task.helpers({
    	isOwner: function () {
    		return this.owner === Meteor.userId();
    	}
    });

    Template.task.events({
    	"click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("updateTask", this._id, !this.checked);
  },
  "click .delete": function () {
  	Meteor.call("deleteTask", this._id);
  },
  "click .toggle-private": function () {
  	Meteor.call("setPrivate", this._id, ! this.private);
  }
});
    Accounts.ui.config({
    	passwordSignupFields: "USERNAME_ONLY"
    });
}
Meteor.methods({
	addTask: function (text) {

		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.insert({
			text: text,
        createdAt: new Date(), // current time
        username: Meteor.user().username,
        owner: Meteor.userId()
    });
	},
	deleteTask: function (taskId) {
		var task = Tasks.findOne(taskId);
		if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
  }
  Tasks.remove(taskId);
},
updateTask: function (taskId, setChecked) {
	var task = Tasks.findOne(taskId);
	if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
  }
  Tasks.update(taskId, {$set: {checked: setChecked}});
},
setPrivate: function (taskId, setToPrivate) {
	var task = Tasks.findOne(taskId);
	
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
    	throw new Meteor.Error("not-authorized");
    }
    
    Tasks.update(taskId, { $set: { private: setToPrivate } });
}
});