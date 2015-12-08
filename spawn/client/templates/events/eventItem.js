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
            var meters = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(this.locationLatLng.lat, this.locationLatLng.lng),
                new google.maps.LatLng(latLng.lat, latLng.lng));
            var miles = parseFloat(Math.round((meters * 0.000621371192) * 100) / 100).toFixed(1);
            return miles;
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