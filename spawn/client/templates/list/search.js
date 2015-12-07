Template.search.helpers({
    tasksIndex: function(){
        return TasksIndex;
    },
    
    inputAttributes: function() {
        var attr = {placeholder: 'Search for events here!'};
        return attr;
    }  
});