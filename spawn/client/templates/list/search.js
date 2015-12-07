// reactive data for search results and checkboxes
searchResults = {
    keys: {"results" : null,
          "hostFilter": "true",
          "eventNameFilter": "true",
          "descriptionFilter": "true"},
    deps: {"results": new Deps.Dependency},
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
var searching = function(text) {
    var f = [];
        // populate search fields
        if(searchResults.get("hostFilter")) {
            f.push('host');
        } else {
            var i = f.indexOf('host');
            if(i > -1) f.splice(i, 1);
        }
        if(searchResults.get("eventNameFilter")) {
            f.push('name');
        } else {
            var i = f.indexOf('name');
            if(i > -1) f.splice(i, 1);
        }
        if(searchResults.get("descriptionFilter")) {
            f.push('description');
        } else {
            var i = f.indexOf('description');
            if(i > -1) f.splice(i, 1);
        }
        
        if(f.length==0) {
            f = ['host', 'name', 'description'];
        }
        
        // make new search index  
        TasksIndex = new EasySearch.Index({
            collection: Tasks,
            fields: f,
            engine: new EasySearch.Minimongo({
                sort: function() {
                    return ['timeU']
                }
            })
        });
        
        // perform the search
        var searchTerm = text;
        if(searchTerm.trim().length == 0) {
            searchResults.set("results", Tasks.find({}, {sort: {timeU: 1}}));
        }
        else {
            searchResults.set("results", TasksIndex.search(searchTerm).mongoCursor);
        }
}

Template.search.events({
    "keyup #searchTerm" : _.throttle(function(event) {
        searching(event.target.value);
    }),
    
    "click #hostFilter" : function(event) {
        if($(event.target).is(':checked')) {searchResults.set("hostFilter", true);}
        else {searchResults.set("hostFilter", false);}
        searching(document.getElementById("searchTerm").value);
    },
    
    "click #eventNameFilter" : function(event) {
        if($(event.target).is(':checked')) searchResults.set("eventNameFilter", true);
        else searchResults.set("eventNameFilter", false);
        searching(document.getElementById("searchTerm").value);
    },
    
    "click #descriptionFilter" : function(event) {
        if($(event.target).is(':checked')) searchResults.set("descriptionFilter", true);
        else searchResults.set("descriptionFilter", false);
        searching(document.getElementById("searchTerm").value);
    }
});

Template.search.onRendered(function() {
        // update checkbox field values in reactive var
        if($(document.getElementById("hostFilter")).is(':checked')) searchResults.set("hostFilter", true);
        else searchResults.set("hostFilter", false);

        if($(document.getElementById("eventNameFilter")).is(':checked')) searchResults.set("eventNameFilter", true);
        else searchResults.set("eventNameFilter", false);

        if($(document.getElementById("descriptionFilter")).is(':checked')) searchResults.set("descriptionFilter", true);
        else searchResults.set("descriptionFilter", false);       
        searching(document.getElementById("searchTerm").value);       
});

Template.search.helpers({
    results: function() {
        if(searchResults.get("results") == null) {
            searchResults.set("results", Tasks.find({}, {sort: {timeU: 1}}));
        }
        return searchResults.get("results");
    }
});