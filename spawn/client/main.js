if (Meteor.isClient) {

    Meteor.startup(function () {
        GoogleMaps.load({
            key: 'AIzaSyDOoNFEqag0ad113n-gkTlXU9cTvixd2Lk',
            libraries: 'places'
        });
    });

    Template.login.events({
        'click #facebook-login': function (event) {
            Meteor.loginWithFacebook({}, function (err) {
                if (err) {
                    throw new Meteor.Error("Facebook login failed");
                }
            });
        },

        'click #logout': function (event) {
            Meteor.logout(function (err) {
                if (err) {
                    throw new Meteor.Error("Logout failed");
                }
            })
        }
    });
}