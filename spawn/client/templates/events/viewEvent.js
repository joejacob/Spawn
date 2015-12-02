/*
TODO:
- allow hosts to edit comments
- allow hosts to edit time
- allow hosts to edit location
- allow people to edit their comments
*/

var MAP_ZOOM = 18;

Template.viewEvent.events({
	"click #joinEvent": function () {
		// console.log(Meteor.user().services.facebook)
		console.log(Meteor.user());
        
        // only if user isnt already in the event
        Tasks.update(this._id, {
            $push: {attendees: {name: Meteor.user().profile.name, 
                                pic: Meteor.user().profile.picture, 
                                uid: Meteor.user()._id}}
        }); 
        
	},
    
    "click #leaveEvent": function () {
        if(Tasks.findOne({_id: this._id}).hostUid == Meteor.user()._id) {
            var atten = Tasks.findOne({_id: this._id}).attendees;
            if(atten.length > 1) {
                // making the new host
                Tasks.update({_id : this._id},
                             {$set : {
                                    host: atten[1].name,
                                    hostUid: atten[1].uid
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
    }
});

Template.viewEvent.onCreated(function() {

    var self = this;

    GoogleMaps.ready('map', function(map) {
      var locationMarker;

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! locationMarker) {
          locationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance,
            title: 'Current Location'
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          locationMarker.setPosition(latLng);
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(locationMarker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });

      var eventMarker = new google.maps.Marker({
        position: map.options.center, //update to be event location
        map: map.instance,
        animation: google.maps.Animation.DROP,
        title: 'Event Location'
      });

    });
});

Template.viewEvent.helpers({
	// tasks: function () {
	// 	return Tasks.find({}, {sort: {createdAt: -1}});
	// }
	comments: function () {
		return EventComments.find({event_id: this._id }, 
                                  {sort: {createdAt: -1}});
	},
    
    isHost: function() {
        if(Tasks.findOne({_id: this._id})) {
            console.log(Tasks.find({$and: [
                                {_id: this._id}, 
                                {hostUid : Meteor.user()._id}]}).count())
            return Tasks.findOne({_id: this._id}).hostUid == Meteor.user()._id;
        }
    },
    
    isParticipating: function() {
        if(Tasks.findOne({_id: this._id})) {
            return _.find(Tasks.findOne({_id: this._id}).attendees, 
                          function(obj) {return obj.uid == Meteor.user()._id});
        }
    },

    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },

    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
});