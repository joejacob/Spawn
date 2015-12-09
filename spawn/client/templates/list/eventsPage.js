/*
TODO:
    - add search bar to search for events by name, host
*/

Template.eventsPage.helpers({
    tasks: function () {
        return Tasks.find({}, {
            sort: {
                timeUntil: 1
            }
        });
    },
    offset: function(){
        if(Tasks.find({'attendees.uid': Meteor.user()._id}).fetch().length >3){
            return 0;   
        }
        else{
    
            return 4/(Tasks.find({'attendees.uid': Meteor.user()._id}).fetch().length % 3);
            
        }
        
    },
    
    myevents: function() {
        return Tasks.find({'attendees.uid': Meteor.user()._id});
    },
    
    myfirstevent: function() {
        return Tasks.find({'attendees.uid': Meteor.user()._id}).fetch();
    },
    mylastevents: function(){
        return _.rest(Tasks.find({'attendees.uid': Meteor.user()._id}).fetch());
    }
});
