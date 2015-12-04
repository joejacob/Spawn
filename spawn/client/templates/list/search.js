/*var options = {
    keepHistory: 1000*60*5,
    localSearch: true
};

var fields = ['name', 'description', 'host'];

EventSearch = new SearchSource('tasks', fields, options);

Template.searchResult.helpers({ 
    getTasks: function() {
        return EventSearch.getData({
            transform: function(matchText, regExp) {
                console.log("matchText: " + matchText.replace(regExp, "$&"));
                return matchText.replace(regExp, "$&")
            },
            //sort: {timeUntil: 1}
        });  
    },

    isLoading: function() {
        return EventSearch.getStatus().loading;
    },
    
   showResults: function() {
       if(EventSearch.getCurrentQuery()) {
            return EventSearch.getCurrentQuery().trim().length >= 1;
       }
       return false;
    }
});

Template.searchResult.rendered = function() {
    console.log("rendered");
    EventSearch.search('');
};

Template.searchBar.events({
    "keyup #search-bar": _.throttle(function(event) {
        event.preventDefault();
        var text = $(event.target).val().trim();
        EventSearch.search(text);
    }, 200), 
    
    "submit form": function(event) {
        event.preventDefault();
        var text = event.target.searchText.value;
        console.log("search text " + text)
        EventSearch.search(text);
    }
});*/