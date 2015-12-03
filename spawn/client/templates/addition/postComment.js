Template.postComment.events({
  "submit form": function (event) {
    
    var event_id = this._id;
    var comment_poster = Meteor.user().profile.name;
    var comment_message = event.target.commentMessage.value;
    console.log(event)
    console.log(event.target)
    EventComments.insert({
      event_id: event_id,
      poster: comment_poster,
      message: comment_message
    });

    // Clear form
    event.target.commentMessage.value = "";

    // Prevent default form submit
    return false;
  }
});