// should prevent duplicate users
Template.viewEvent.events({
	"click #joinEvent": function () {
		var me = Meteor.user().profile.name;
		// console.log(Meteor.user().services.facebook)
		console.log(Meteor.user());
        
        // unsuccesfully querying the the db lol
        /* var i = new Meteor.Collection.ObjectID(this.id)
        console.log(i);
        console.log(Tasks.find({"_id" : this._id}));
        console.log(Tasks.find( {$and: [
                                    {"_id": this._id}, 
                                    {"attendees.uid": Meteor.user()._id}
                                ]}));*/
        // only if user isnt already in the event
        if(Tasks.find({$and: [
                            {"_id": this._id}, 
                            {"attendees.uid": Meteor.user()._id}]}).count() == 0) {
            Tasks.update(this._id, {
                $push: {attendees: {name: me, 
                                    pic: Meteor.user().profile.picture, 
                                    uid: Meteor.user()._id}}
            }); 
        }
	},
    
    "click #leaveEvent": function () {
		console.log("left event");
		Tasks.update({"_id" : this._id}, 
                     {$pull: {"attendees": {"uid": Meteor.user()._id}}},
                     {multi : true});
	},
    
    // have to implement redirect user after event deleted
    // create a function so i can optionally show "delete event"
    "click #deleteEvent": function() {
        console.log("deleted event");
        if (Tasks.find({$and: [
                            {"_id": this._id}, 
                            {"hostUid": Meteor.user()._id}]}).count() == 1) {
            Tasks.remove({"_id":this._id});
        }
    }
});




Template.viewEvent.helpers({
	// tasks: function () {
	// 	return Tasks.find({}, {sort: {createdAt: -1}});
	// }


	comments: function () {
		return EventComments.find({event_id: this._id }, {sort: {createdAt: -1}});
	}


});