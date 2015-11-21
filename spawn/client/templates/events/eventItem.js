/*
TODO:
    - timer until event starts
    - changes color
*/

var countdown;


Template.eventItem.helpers({
    
	eventSize: function () {
		if(this.attendees) {
			return this.attendees.length;
		}
		return 0;
	},
    
    getCountdown: function() {
        if(this.timeUntil && !countdown) {
            countdown = new ReactiveCountdown(parseInt(this.timeUntil), {interval: 1000});
            countdown.start();
        }      
        if(this.timeUntil && countdown) {
            // update the database. uncomment this in the future
            /*Tasks.update({_id: this._id}, {
                         $set: timeUntil : countdown.get()
                         })*/
            var hours = "" + Math.floor(countdown.get()/3600);
            var h = (hours.length == 1) ? ("0" + hours):hours;
            var minutes = "" + Math.floor((countdown.get() - hours*3600)/60);
            var m = (minutes.length == 1) ? ("0" + minutes):minutes;
            var seconds = "" + (countdown.get() - hours*3600 - minutes*60);
            var s = (seconds.length == 1) ? ("0" + seconds):seconds;
            var t = "" + h + ":" + m + ":" + s;
            return t;
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