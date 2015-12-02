var MAP_ZOOM = 18;

Template.displayEventMap.onCreated(function() {

    var self = this;

    GoogleMaps.ready('map', function(map) {
      var locationMarker;

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! locationMarker) {
          locationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance,
            title: 'Current Location'
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          locationMarker.setPosition(latLng);
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(locationMarker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      });

      var eventMarker = new google.maps.Marker({
        position: map.options.center, //update to be event location
        map: map.instance,
        animation: google.maps.Animation.DROP,
        title: 'Event Location'
      });

    });
});

Template.displayEventMap.helpers({

    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },

    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
});