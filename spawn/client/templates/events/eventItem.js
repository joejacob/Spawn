/*
TODO:
    - timer until event starts
    - changes color
*/


Template.eventItem.helpers({
    
	eventSize: function () {
		if(this.attendees) {
			return this.attendees.length;
		}
		return 0;
	},
    
    getCountdown: function() {
        if(this.timeUntil && typeof(this.timeUntil) == 'number') {
            this.timeUntil = new ReactiveCountdown(parseInt(this.timeUntil), {interval: 1000});
            this.timeUntil.start();
        }      
        if(this.timeUntil && typeof(this.timeUntil) != 'number') {
            // update the database
            /*Tasks.update({_id: this._id}, {
                         $set: {timeUntil : countdown}
                         })*/
            
            var timer = this.timeUntil.get();
            
            // start the timer until removal of the event in 2hours
            if(timer == 0) {
                if(typeof(this.timeUntilDisappear) == 'number') {
                    this.timeUntilDisappear = new ReactiveCountdown(parseInt(this.timeUntilDisappear), {interval: 1000});
                    this.timeUntilDisappear.start();
                }
                 // remove event if disappear countdown reaches 2 hours
                if(this.timeUntilDisappear && typeof(this.timeUntilDisappear) != 'number' && this.timeUntilDisappear.get() == 0) {
                    Tasks.remove({_id: this._id});
                }
            }
            
            
            var hours = "" + Math.floor(timer/3600);
            var h = (hours.length == 1) ? ("0" + hours):hours;
            var minutes = "" + Math.floor((timer - hours*3600)/60);
            var m = (minutes.length == 1) ? ("0" + minutes):minutes;
            var seconds = "" + (timer - hours*3600 - minutes*60);
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