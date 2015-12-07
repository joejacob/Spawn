ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1650844851825940',
    secret: '5281f547dab18a457749f5c01e44d1d9',
    requestPermissions: ['user_friends']
});

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.friends = [];
        user.profile = options.profile;
        console.log("new user added");
    }
    return user;
});

Accounts.onLogin(function(attempt){
    if(attempt.user){
        var cur = Meteor.user().profile;
        cur.picture  = "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";

        var arguments = {
            headers: {"User-Agent": "Meteor/1.2.1"},
            params: { "access_token": Meteor.user().services.facebook.accessToken }
        }

        HTTP.get("https://graph.facebook.com/" + Meteor.user().services.facebook.id + "/friends", arguments, function(error, result) {
            cur.friends = result.data.data;
            Meteor.users.update(Meteor.user()._id, {$set: {profile: cur}});
        });
    }
});