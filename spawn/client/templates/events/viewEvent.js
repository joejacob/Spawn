/*
TODO:
- allow hosts to edit comments
- allow hosts to edit time
- allow hosts to edit location
- allow people to edit their comments
*/

Template.viewEvent.events({
	"click #joinEvent": function () {
        if(this.attendees.length < this.numParticipants) {
            // console.log(Meteor.user().services.facebook)
            console.log(Meteor.user());
            
            // only if user isnt already in the event
            Tasks.update(this._id, {
                $push: {attendees: {name: Meteor.user().profile.name, 
                                    pic: Meteor.user().profile.picture, 
                                    uid: Meteor.user()._id}}
            }); 
        }
        else {
            toastr.error("This event's full!")
        }
	},
    
    "click #leaveEvent": function () {
        if(Tasks.findOne({_id: this._id}).hostUid == Meteor.user()._id) {
            var atten = Tasks.findOne({_id: this._id}).attendees;
            if(atten.length > 1) {
                // making the new host
                Tasks.update({_id : this._id},
                             {$set : {
                                    host: atten[1].name,
                                    hostUid: atten[1].uid,
                                    hostPic: atten[1].picture
                                }})
                // removing the old host
                Tasks.update({_id : this._id}, 
                     {$pull: {"attendees": {"uid": Meteor.user()._id}}},
                     {multi : true});
                console.log("left event");
            } else {
                toastr.error("You're the host of the event! You're going to have to delete the event if you want to leave.", "Cannot leave event")
            }
        } else {
            Tasks.update({_id : this._id}, 
                     {$pull: {attendees: {uid: Meteor.user()._id}}},
                     {multi : true});
            console.log("left event");
        }
	},
    
    "click #deleteEvent": function() {
        if (Tasks.findOne({_id: this._id}).hostUid == Meteor.user()._id) {
            console.log("deleted event");
            Tasks.remove({_id:this._id});
            Router.go("eventsPage");
        }
    },
    "click #directionsButton": function (event){
        event.preventDefault();
        window.open("https://maps.google.com?saddr=Current+Location&daddr="+this.locationLatLng.lat+","+ this.locationLatLng.lng);
    }
});

Template.viewEvent.helpers({

	comments: function () {
		return EventComments.find({event_id: this._id }, 
                                  {sort: {createdAt: -1}});
	},
    
    isHost: function() {
        if(Tasks.findOne({_id: this._id})) {
            return Tasks.findOne({_id: this._id}).hostUid == Meteor.user()._id;
        }
    },
    
    isParticipating: function() {
        if(Tasks.findOne({_id: this._id})) {
            return _.find(Tasks.findOne({_id: this._id}).attendees, 
                          function(obj) {return obj.uid == Meteor.user()._id});
        }
    },

    getDistance: function() {
        var latLng = Geolocation.latLng();

        if (latLng) {
            var meters = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(this.locationLatLng.lat, this.locationLatLng.lng),
                new google.maps.LatLng(latLng.lat, latLng.lng));
            var miles = parseFloat(Math.round((meters * 0.000621371192) * 100) / 100).toFixed(1);
            return miles;
        }
    },
});