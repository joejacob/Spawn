// Meteor.methods({

// 	refreshFriends: function(person) {

// 		var cur = person.profile;
//         cur.picture  = "http://graph.facebook.com/" + person.services.facebook.id + "/picture/?type=large";

//         var arguments = {
//             headers: {"User-Agent": "Meteor/1.2.1"},
//             params: { "access_token": person.services.facebook.accessToken }
//         }

//         HTTP.get("https://graph.facebook.com/" + person.services.facebook.id + "/friends", arguments, function(error, result) {
//             // console.log(result)
//             var temp_friends = result.data.data;
//             var updated_friends = [];
//             for(var i=0; i<temp_friends.length; i++) {
//                 temp_friends[i].pic = "http://graph.facebook.com/" + temp_friends[i].id + "/picture/?type=large";
//                 var friend_account = Meteor.users.findOne({'services.facebook.id': temp_friends[i].id})
//                 if (friend_account != undefined && friend_account != null) {
//                     temp_friends[i].uid = friend_account._id;
//                     updated_friends.push(temp_friends[i]);
//                 }
//             }
//             cur.friends = updated_friends;
//             Meteor.users.update(person._id, {$set: {profile: cur}});
//         });
//         console.log('finished updating friends');

// 	}

// });


