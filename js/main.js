function initMap() {
	var map;
	var chernihiv = {lat: 51.4938405,lng: 31.3015627},
		slavutych = {lat: 51.5178136,lng: 30.765362},

    map = new google.maps.Map(document.getElementById('map'), {
    	center: slavutych,
    	zoom: 10,
    	scrollwheel: false,
    	mapTypeControl: true
    });

    var infowindow_che = new google.maps.InfoWindow({
    	content: "Beetroot Academy"
  	});
  	var infowindow_slav = new google.maps.InfoWindow({
    	content: "My home"
  	});

    var image = {
	    url: 'favicon.png',
	    scaledSize : new google.maps.Size(22, 22)
  	};

  	var marker_che = new google.maps.Marker({
	    position: chernihiv,
	    map: map,
	    icon: image
	});
	var marker_slav = new google.maps.Marker({
	    position: slavutych,
	    map: map,
	    icon: image
	});
	
  	infowindow_che.open(map, marker_che);
	marker_che.addListener('click', function() {
		infowindow_che.open(map, marker_che);
	});

	infowindow_slav.open(map, marker_slav);
	marker_slav.addListener('click', function() {
		infowindow_slav.open(map, marker_slav);
	});

	// google.maps.event.addDomListener(window, 'resize', function() {
 //    var center = map.getCenter()
 //    google.maps.event.trigger(map, "resize")
 //    map.setCenter(center)
	// });

	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay.setMap(map);
	directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );
	directionsDisplay.setPanel(document.getElementById('directionsPanel'));

	$('.adp-placemark img.adp-marker').attr("src","../favicon.png"); // не меняет маркер в описании маршрута

	var request = {
		origin: slavutych,
		destination: chernihiv,
		travelMode: google.maps.TravelMode.DRIVING,
	}
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
			var routes = result.routes;
			var leg = routes[0].legs;
			var lenght = leg[0].distance.text;
			var duration = leg[0].duration.text;
		}
	});

}
$(document).ready(function(){
	initMap();
});