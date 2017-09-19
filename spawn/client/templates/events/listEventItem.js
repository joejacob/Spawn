Template.listEventItem.events({
    "click #distanceButton": function (event){
        event.preventDefault();
        window.open("https://maps.google.com?saddr=Current+Location&daddr="+this.locationLatLng.lat+","+ this.locationLatLng.lng);
    },
     "click #leaveEvent": function () {
        console.log(this);
         event.preventDefault();
        if(Tasks.findOne({_id: this._id}).hostUid == Meteor.user()._id) {
            var atten = Tasks.findOne({_id: this._id}).attendees;
            if(atten.length > 1) {
                // making the new host
                Tasks.update({_id : this._id},
                             {$set : {
                                    host: atten[1].name,
                                    hostUid: atten[1].uid,
                                    hostPic: atten[1].pic
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
        
	}
});
Template.listEventItem.helpers({
    
	eventSize: function () {
		if(this.attendees) {
			return this.attendees.length;
		}
		return 0;
	},
    get6attendees: function(){
        if(this.attendees) {
			return _.first(this.attendees, 6);
		}
        
    },
    offset: function(){
      return 6-_.first(this.attendees, 6).length;
    },
    isParticipating: function() {
        if(Tasks.findOne({_id: this._id})) {
            return _.find(Tasks.findOne({_id: this._id}).attendees, 
                          function(obj) {return obj.uid == Meteor.user()._id});
        }
    },
    get12Time: function() {
        // convert 24-hour time to 12-hour time
        var timeArr = this.time.split(":")
        var suffix = (timeArr[0] >= 12)? 'pm' : 'am';
        var eHours = (timeArr[0] > 12)? timeArr[0] -12 : timeArr[0];
        var eHours = (eHours == '00')? 12 : eHours;  
        return eHours + ":" + timeArr[1] + suffix 
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
    
    getProgress: function(){
        if(this.attendees) {
			return this.attendees.length/this.numParticipants*100;
		}
		return 0;
        
    },
    getFirstName: function(){
        return this.name.split(' ')[0];
        
    }
    
    /*getColor: function() {
        if(this.countdown) {
            var R = 255 - (this.countdown.get()/86400)*255;
            var G = (this.countdown.get()/86400)*255;
            this.color = "rgb(" + R + "," + G + ",0)"
            console.log(this.color);
        }
        return this.color;
    }*/
});

// should be implemented later
/*
Template.eventItem.onRendered(function() {
    var currDate = new Date()
    if(this.createdAt && this.timeU) {
        console.log(this.createdAt)
        if((currDate.getTime() - this.createdAt.getTime())/1000 >= (7200 + this.timeU)) {
            Tasks.remove({_id: this._id});
        }
    }
});*/