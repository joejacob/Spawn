UI.registerHelper('getCountdown', function () {
    var currDate = new Date();

    // checking to see if event needs to be deleted after 2 hours/if time elapsed

    if(this.createdAt && (currDate.getTime() - this.createdAt.getTime())/1000 >= (0 + this.timeU)) { // 7200
        var task_to_remove = Tasks.findOne({_id: this._id});
        PastEvents.insert(task_to_remove);
        Tasks.remove({_id: this._id});
    }
    else{
        if((currDate.getTime() - this.createdAt.getTime())/1000 >= this.timeU) {
            return "00:00:00";
        }
        else {
            // getting countdown time difference
            var currTime = parseInt(currDate.getHours())*3600 + parseInt(currDate.getMinutes())*60 + parseInt(currDate.getSeconds());
            var timeArr = this.time.split(":");
            var eventTimeInt = parseInt(timeArr[0])*3600 + parseInt(timeArr[1])*60;  
            var timeU = (currTime < eventTimeInt) ? (eventTimeInt - currTime) : (86400 - (currTime - eventTimeInt));

            // starting reactive timer
            var timer = new ReactiveCountdown(timeU, {interval: 1000});
            timer.start();    


            // formatting time
            var timeVal = timer.get();  
            var hours = "" + Math.floor(timeVal/3600);
            var h = (hours.length == 1) ? ("0" + hours):hours;
            var minutes = "" + Math.floor((timeVal - hours*3600)/60);
            var m = (minutes.length == 1) ? ("0" + minutes):minutes;
            var seconds = "" + (timeVal - hours*3600 - minutes*60);
            var s = (seconds.length == 1) ? ("0" + seconds):seconds;
            var t = "" + h + ":" + m + ":" + s;
            return t;
        }
    }
});

UI.registerHelper('getCountdownString', function () {
    var currDate = new Date();

    // checking to see if event needs to be deleted after 2 hours/if time elapsed
    if((currDate.getTime() - this.createdAt.getTime())/1000 >= (0 + this.timeU)) { // 7200
        var task_to_remove = Tasks.findOne({_id: this._id});
        PastEvents.insert(task_to_remove);
        Tasks.remove({_id: this._id});
    }
    else{
        if((currDate.getTime() - this.createdAt.getTime())/1000 >= this.timeU) {
            return "0 H, 0 M, 0 S";
        }
        else {
            // getting countdown time difference
            var currTime = parseInt(currDate.getHours())*3600 + parseInt(currDate.getMinutes())*60 + parseInt(currDate.getSeconds());
            var timeArr = this.time.split(":");
            var eventTimeInt = parseInt(timeArr[0])*3600 + parseInt(timeArr[1])*60;  
            var timeU = (currTime < eventTimeInt) ? (eventTimeInt - currTime) : (86400 - (currTime - eventTimeInt));

            // starting reactive timer
            var timer = new ReactiveCountdown(timeU, {interval: 1000});
            timer.start();    


            // formatting time
            var timeVal = timer.get();  
            var hours = "" + Math.floor(timeVal/3600);
            var h = (hours.length == 1) ? ("0" + hours):hours;
            var minutes = "" + Math.floor((timeVal - hours*3600)/60);
            var m = (minutes.length == 1) ? ("0" + minutes):minutes;
            var seconds = "" + (timeVal - hours*3600 - minutes*60);
            var s = (seconds.length == 1) ? ("0" + seconds):seconds;
            var t = "" + h + " hours, " + m + " minutes, " + s + " seconds";
            return t;
        }
    }
});