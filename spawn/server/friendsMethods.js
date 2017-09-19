Meteor.methods({
    refreshFriends: function(person) {
        var cur_user = Meteor.users.findOne({_id: person});
        if(cur_user != undefined && cur_user != null) {
            var cur = cur_user.profile;
            cur.picture  = "http://graph.facebook.com/" + cur_user.services.facebook.id + "/picture/?type=large";

            var arguments = {
                headers: {"User-Agent": "Meteor/1.2.1"},
                params: { "access_token": cur_user.services.facebook.accessToken }
            }

            HTTP.get("https://graph.facebook.com/" + cur_user.services.facebook.id + "/friends", arguments, function(error, result) {
                var temp_friends = result.data.data;
                var updated_friends = [];
                for(var i=0; i<temp_friends.length; i++) {
                    temp_friends[i].pic = "http://graph.facebook.com/" + temp_friends[i].id + "/picture/?type=large";
                    var friend_account = Meteor.users.findOne({'services.facebook.id': temp_friends[i].id})
                    if (friend_account != undefined && friend_account != null) {
                        temp_friends[i].uid = friend_account._id;
                        updated_friends.push(temp_friends[i]);
                    }
                }
                cur.friends = updated_friends;
                console.log(cur);
                Meteor.users.update(cur_user._id, {$set: {profile: cur}});
            });
        }
    }
});