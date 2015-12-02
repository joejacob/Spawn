var MAP_ZOOM = 18;

Template.addEventMap.onCreated(function() {

    GoogleMaps.ready('map', function(map) {

      var eventMarker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance,
        draggable: true,
        title: 'Event Location'
      });

    });
});

Template.addEventMap.helpers({

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