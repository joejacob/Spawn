// should prevent duplicate users
Template.viewEvent.events({
	"click #joinEvent": function () {
		var me = Meteor.user().username || Meteor.user().profile.name;
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
        
            Tasks.update(this._id, {
                $push: {attendees: {name: me, 
                                    pic: Meteor.user().profile.picture, 
                                    uid: Meteor.user()._id}}
            });       
	},
    
    /*"click #leaveEvent": function () {
		var me = Meteor.user().username || Meteor.user().profile.name;
		console.log(Meteor.user());
		Tasks.remove(this._id, 
                    $pull: {"attendees": {"uid": Meteor.user()._id}});
	},
    
    "click #deleteEvent": function() {
        if (Tasks.find({$and: [
                            {"_id": this._id}, 
                            {"host" : {"uid": Meteor.user()._id}}]})) {
            Tasks.remove({"_id":this._id});
        }
    }*/
});




Template.viewEvent.helpers({
	// tasks: function () {
	// 	return Tasks.find({}, {sort: {createdAt: -1}});
	// }


	comments: function () {
		return EventComments.find({event_id: this._id }, {sort: {createdAt: -1}});
	}


});