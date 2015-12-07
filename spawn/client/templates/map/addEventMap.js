var MAP_ZOOM = 17;
var eventLocation;

Template.addEventMap.onCreated(function () {

    GoogleMaps.ready('map', function (map) {
        var input = document.getElementById('places');
        var searchBox = new google.maps.places.SearchBox(input);

        map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.instance.addListener('bounds_changed', function () {
            searchBox.setBounds(map.instance.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            if (places.length == 1) {
                // For each place, get the icon, name and location.
                place = places[0];
                map.instance.panTo(place.geometry.location);
                eventMarker.setPosition(place.geometry.location);
                placeLocation = {
                    lat: eventMarker.getPosition().lat(),
                    lng: eventMarker.getPosition().lng()
                };
                Session.set('selectedLocation', placeLocation);
                Session.set('locationName', place.name + ",   " + place.formatted_address);
            }
        });
        var eventMarker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance,
            draggable: true,
            title: 'Event Location'
        });
        Session.set('selectedLocation', eventLocation);
        geocodeLatLng(map.options.center, map.instance);
        
        google.maps.event.addListener(eventMarker, 'dragend', function (event) {
            eventLocation = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
            Session.set('selectedLocation', eventLocation);
            geocodeLatLng(eventLocation, map.instance);
        });
    });
});

Template.addEventMap.helpers({

    geolocationError: function () {
        var error = Geolocation.error();
        return error && error.message;
    },

    mapOptions: function () {
        var latLng = Geolocation.latLng();
        // Initialize the map once we have the latLng.

        if (GoogleMaps.loaded() && latLng) {
            eventLocation = {
                lat: latLng.lat,
                lng: latLng.lng
            };

            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: MAP_ZOOM
            };
        }
    }
});

function geocodeLatLng(location, map) {
  var geocoder = new google.maps.Geocoder;

  geocoder.geocode({'location': location}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        Session.set('locationName', results[1].formatted_address);
      }
    } else {
      //window.alert('Geocoder failed due to: ' + status);
    }
  });
}