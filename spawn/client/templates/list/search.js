

// reactive data for search results and checkboxes
searchResults = {
    keys: {
        "results": null,
        "hostFilter": true,
        "eventNameFilter": true,
        "descriptionFilter": true,
        "publicFilter": true,
        "privateFilter": false,
        "hostSort": false,
        "eventNameSort": false,
        "capacitySort": false,
        "timeUntilSort": true,
        "distanceSort": false,
        "direction": true
    },
    deps: {
        "results": new Deps.Dependency
    },
    get: function (key) {
        this.ensureDeps(key);
        this.deps[key].depend();
        return this.keys[key];
    },
    set: function (key, value) {
        this.ensureDeps(key);
        this.keys[key] = value;
        this.deps[key].changed();
    },
    ensureDeps: function (key) {
        if (!this.deps[key])
            this.deps[key] = new Deps.Dependency;
    }
};

// performs the search
var searching = function (text) {
    var f = [];
    var latLng = Geolocation.latLng();
    // populate search fields
    if (searchResults.get("hostFilter")) {
        f.push('host');
    } else {
        var i = f.indexOf('host');
        if (i > -1) f.splice(i, 1);
    }
    if (searchResults.get("eventNameFilter")) {
        f.push('name');
    } else {
        var i = f.indexOf('name');
        if (i > -1) f.splice(i, 1);
    }
    if (searchResults.get("descriptionFilter")) {
        f.push('description');
    } else {
        var i = f.indexOf('description');
        if (i > -1) f.splice(i, 1);
    }

    if (f.length == 0) {
        f = ['host', 'name', 'description'];
    }

    // figure out how to sort
    var s = []
    if (searchResults.get("hostSort")) s = ['host'];
    if (searchResults.get("eventNameSort")) s = ['name'];
    if (searchResults.get("capacitySort")) s = ['numParticipants'];
    if (searchResults.get("timeUntilSort")) s = ['timeU'];
    if (searchResults.get("distanceSort")) s = ['locationLatLng'];

    console.log(s);
    // direction of sorting
    var d = 1;
    if (!searchResults.get("direction")) {
        d = -1;
        s.push('desc');
    }

    // make new search index  
    if (s[0] != 'locationLatLng') {
        TasksIndex = new EasySearch.Index({
            collection: Tasks,
            fields: f,
            engine: new EasySearch.Minimongo({
                sort: function () {
                    return [s]
                }
            })
        });
    } else {
        TasksIndex = new EasySearch.Index({
            collection: Tasks,
            fields: f,
            engine: new EasySearch.Minimongo({
                sort: function () {

                }
            })
        });
    }

    // perform the search
    var searchTerm = text;
    if (searchTerm.trim().length == 0) {
        if (s[0] == 'host') {
            if(searchResults.get("privateFilter")) {searchResults.set("results", Tasks.find({$and: [{visibility: 'private'}, {hostUid: {$in: Meteor.user().profile.friends}}]}, {sort: {host: d}}))}
            else {searchResults.set("results", Tasks.find({}, {sort: {host: d}}))};
        }
        if (s[0] == 'name') {
            if(searchResults.get("privateFilter")) {searchResults.set("results", Tasks.find({$and: [{visibility: 'private'}, {$or: [{hostUid: {$in: Meteor.user().profile.friends}}, {hostUid: Meteor.user()._id}]}]}, {sort: {name: d}}))}
            else {searchResults.set("results", Tasks.find({}, {sort: {name: d}}));}
        }
        if (s[0] == 'numParticipants') {
            if(searchResults.get("privateFilter")) {searchResults.set("results", Tasks.find({$and: [{visibility: 'private'}, {$or: [{hostUid: {$in: Meteor.user().profile.friends}}, {hostUid: Meteor.user()._id}]}]}, {sort: {numParticipants: d}}))}
            else {searchResults.set("results", Tasks.find({}, {sort: {numParticipants: d}}));}
        }
        if (s[0] == 'timeU') {
            if(searchResults.get("privateFilter")) {searchResults.set("results", Tasks.find({$and: [{visibility: 'private'}, {$or: [{hostUid: {$in: Meteor.user().profile.friends}}, {hostUid: Meteor.user()._id}]}]}, {sort: {timeU: d}}))}
            else {searchResults.set("results", Tasks.find({}, {sort: {timeU: d}}));}
        }
        if (s[0] == 'locationLatLng') {
            var cursor = Tasks.find({});
            cursor.forEach(function (ltask) {
                var miles;
                if (latLng) {
                    console.log("update")
                    var meters = google.maps.geometry.spherical.computeDistanceBetween(
                        new google.maps.LatLng(ltask.locationLatLng.lat, ltask.locationLatLng.lng),
                        new google.maps.LatLng(latLng.lat, latLng.lng));
                    miles = parseFloat(Math.round((meters * 0.000621371192) * 100) / 100).toFixed(1);
                        localTasks.insert({
                                _id: ltask._id,
                                name: ltask.name,
                                visibility: ltask.visibility,
                                description: ltask.description,
                                time: ltask.time,
                                createdAt: ltask.createdAt,
                                timeU: ltask.timeU,
                                host: ltask.host,
                                hostPic: ltask.hostPic,
                                hostUid: ltask.Uid,
                                attendees: ltask.attendees,
                                locationLatLng: ltask.locationLatLng,
                                locationName: ltask.locationName,
                                numParticipants: ltask.numParticipants,
                                localDist: miles
                            })
                    }}); 
            
            var kursor = localTasks.find({});
            kursor.forEach(function (ltask) {
                var p = ltask.localDist;
            });
            searchResults.set("results", localTasks.find({}, {
                sort: {
                    localDist: d
                }
            }));
        }
    } 
}

Template.search.events({
    "keyup #searchTerm": _.throttle(function (event) {
        searching(event.target.value);
    }),

    "click #hostFilter": function (event) {
        if ($(event.target).is(':checked')) {
            searchResults.set("hostFilter", true);
        } else {
            searchResults.set("hostFilter", false);
        }
        searching(document.getElementById("searchTerm").value);
    },

    "click #eventNameFilter": function (event) {
        if ($(event.target).is(':checked')) searchResults.set("eventNameFilter", true);
        else searchResults.set("eventNameFilter", false);
        searching(document.getElementById("searchTerm").value);
    },

    "click #descriptionFilter": function (event) {
        if ($(event.target).is(':checked')) searchResults.set("descriptionFilter", true);
        else searchResults.set("descriptionFilter", false);
        searching(document.getElementById("searchTerm").value);
    },

    "click #publicFilter": function (event) {
        searchResults.set("publicFilter", true);
        searchResults.set("privateFilter", false);
        searching(document.getElementById("searchTerm").value);
    },
    
    "click #privateFilter": function (event) {
        searchResults.set("publicFilter", false);
        searchResults.set("privateFilter", true);
        searching(document.getElementById("searchTerm").value);
    },
    
    "click #hostRadio": function (event) {
        searchResults.set("hostSort", true);
        searchResults.set("eventNameSort", false);
        searchResults.set("capacitySort", false);
        searchResults.set("timeUntilSort", false);
        searchResults.set("distanceSort", false);
        searching(document.getElementById("searchTerm").value);
    },

    "click #eventNameRadio": function (event) {
        searchResults.set("hostSort", false);
        searchResults.set("eventNameSort", true);
        searchResults.set("capacitySort", false);
        searchResults.set("timeUntilSort", false);
        searchResults.set("distanceSort", false);
        searching(document.getElementById("searchTerm").value);
    },

    "click #capacityRadio": function (event) {
        searchResults.set("hostSort", false);
        searchResults.set("eventNameSort", false);
        searchResults.set("capacitySort", true);
        searchResults.set("timeUntilSort", false);
        searchResults.set("distanceSort", false);
        searching(document.getElementById("searchTerm").value);
    },

    "click #timeUntilRadio": function (event) {
        searchResults.set("hostSort", false);
        searchResults.set("eventNameSort", false);
        searchResults.set("capacitySort", false);
        searchResults.set("timeUntilSort", true);
        searchResults.set("distanceSort", false);
        searching(document.getElementById("searchTerm").value);
    },

    "click #distanceRadio": function (event) {
        searchResults.set("hostSort", false);
        searchResults.set("eventNameSort", false);
        searchResults.set("capacitySort", false);
        searchResults.set("timeUntilSort", false);
        searchResults.set("distanceSort", true);
        console.log("distance");
        searching(document.getElementById("searchTerm").value);
    },

    "click #ascendingRadio": function (event) {
        searchResults.set("direction", true);
        searching(document.getElementById("searchTerm").value);
    },

    "click #descendingRadio": function (event) {
        searchResults.set("direction", false);
        searching(document.getElementById("searchTerm").value);
    }
});

Template.search.onRendered(function () {
    // update checkbox field values in reactive var
    if ($(document.getElementById("hostFilter")).is(':checked')) searchResults.set("hostFilter", true);
    else searchResults.set("hostFilter", false);

    if ($(document.getElementById("eventNameFilter")).is(':checked')) searchResults.set("eventNameFilter", true);
    else searchResults.set("eventNameFilter", false);

    if ($(document.getElementById("descriptionFilter")).is(':checked')) searchResults.set("descriptionFilter", true);
    else searchResults.set("descriptionFilter", false);

    searchResults.set("hostSort", false);
    searchResults.set("eventNameSort", false);
    searchResults.set("capacitySort", false);
    searchResults.set("timeUntilSort", true);
    searchResults.set("distanceSort", false);
    searchResults.set("publicFilter", true);
    searchResults.set("privateFilter", false);
    searchResults.set("direction", true);
    searching(document.getElementById("searchTerm").value);
});

Template.search.helpers({
    results: function () {
        /*if(searchResults.get("results") == null) {
            searchResults.set("results", Tasks.find({}, {sort: {timeU: 1}}));
        }*/
        return searchResults.get("results");
    },

    noResults: function () {
        return searchResults.get("results") == null;
    }
});