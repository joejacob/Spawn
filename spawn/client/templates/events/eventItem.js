/*
TODO:
    - create an autodelete timer
    - changes color
*/


Template.eventItem.helpers({
    
	eventSize: function () {
		if(this.attendees) {
			return this.attendees.length;
		}
		return 0;
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
            return getDistanceFromLatLonInKm(latLng.lat, latLng.lng, this.locationLatLng.lat, this.locationLatLng.lng);
        }
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

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return parseFloat(Math.round(d * 100) / 100).toFixed(1);;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

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