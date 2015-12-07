/*
    - different sections for events participated in and events created
    - pull more data from facebook
        - spawn friends
        - location
        - age
*/
Template.profilePage.helpers({
	tasks: function () {
        if(this.profile) {
            console.log(this.profile)
 		    return Tasks.find({host: this.profile.name}, {sort: {createdAt: -1}});
        }
	},

    friends: function() {   
        if(this.profile) {
            // return something
        }
    }
});