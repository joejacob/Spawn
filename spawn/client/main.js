if (Meteor.isClient) {

    Meteor.startup(function () {
        GoogleMaps.load({
            key: 'AIzaSyDOoNFEqag0ad113n-gkTlXU9cTvixd2Lk',
            libraries: ['places', 'geometry']
        });
    });

    Template.login.events({
        'click #facebook-login': function (event) {
            Meteor.loginWithFacebook({
                requestPermissions: ['user_friends']
            }, function (err) {
                if (err) {
                    throw new Meteor.Error("Facebook login failed");
                } else {
                    console.log("logged");
                    Router.go('eventsPage');
                }
            });
        },

        'click #logout': function (event) {
            Meteor.logout(function (err) {
                if (err) {
                    throw new Meteor.Error("Logout failed");
                } else {
                    Router.go('landingPage');
                }
            })
        }
    });
}
