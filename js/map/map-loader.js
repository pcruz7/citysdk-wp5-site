var form = null, 
previousHeight = 0,
markers = [],
polygons = [],
mClient, checked = false,
map = null, selectCoords = null,
storedRoutes = [],
renderers = [],
call = [getPois, getEvents, getRoutes],
callback = [handlePois, handleEvents, handleRoutes],
consoleCB, mapHome,
latLng,
bouncyBob = null,
viewing = null,
markerCluster, response;

function loadMap (callback) {
	var html = 
	'<div id="map-canvas">'+
	'</div>'+
	'<div id="progress" style="margin-top: 10px">'+
	'	<div id="progressbar-map"><div class="progress-label" style="margin-left: 45%">Loading...</div></div>'+
	'</div>'+
	'<div id="route-select" style="margin-top: 10px">'+
	'	<label for="route">View Route:</label>'+
	'	<select id="route">'+
	'	</select>'+
	'	<button id="route-button">View</button>'+
	'</div>'+
	'<div id="text-container">'+
	'	<div id="lang" style="margin-top: 10px"></div>'+
	'	<div id="msg" style="margin-top: 10px"></div>'+
	'	<div id="mError" class="ui-widget">'+
	'		<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> '+
	'			<p style="margin: 1em 0; ">'+
	'			<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><strong>Alert:</strong> There was an error handling the request'+
	'			</p>'+
	'		</div>'+
	'	</div>'+
	'</div>';

	$('#map-container').html(html);
	$('#mError').hide();
	
	initMapClient("http://tourism.citysdk.cm-lisboa.pt/resources");
	consoleCB = callback;
	initializeMap();
};

function getResponse() {
	return response;
};

function initMapClient(uri) {
	TourismVisitor.visit(uri, handleMapVisit, handleInitError);
	mapHome = uri;
};

function handleMapVisit(client, textStatus, jqXHR) {
	mClient = client;
	mClient.useVersion('1.0');

	consoleCB(mapHome, mClient.getRawResources(), 'home');
	loadMapWidgets();
};

function handleInitError(jqXHR, textStatus, errorThrown) {
	console.log(jqXHR, errorThrown, textStatus);
	$('#mError').show();
	$('#map-canvas').hide();
	$('#progress').hide();
	$('#route-select').hide();
	resize();
};

function handleMapError(jqXHR, textStatus, errorThrown) {
	console.log(jqXHR, errorThrown, textStatus);
	hideMapLoad();
	$('#text-container').show();
	$('#mError').show();
	resize();
	consoleCB(mClient.getLastCall(), textStatus, 'home');
};

function resize() {
	var contentHeight = $('.map').height(),
	text = $('#text-container').height();
	progress = $('#progress').height();

	$('').css({
		'height' : (contentHeight - previousHeight) + text + progress
	});

	previousHeight = text + progress;
};

function loadMapWidgets() {
	$('#route-select').hide();
	$('#route-button').click(function(){
		var i = $('#route').val();
		mClient.getRoute(storedRoutes[i].base, storedRoutes[i].id, handleRoute, handleMapError);
		showMapLoad();
	});

	$('#poi-type').change(function(){
		if($(this).val() != 2) {
			$('#route-select').hide();
		} else if($('#route-select option').length > 0){
			$('#route-select').show();
		}

		resize();
	});

	$('#progressbar-map').progressbar({
		value: false
	});

	$('#progressbar-map').hide();
};

function clearDirections() {
	while (renderers.length > 0) {
		renderers.pop().setMap(null);
	}
};

function clearPolygons() {
	while (polygons.length > 0) {
		polygons.pop().setMap(null);
	}
};

function clearMarkers() {
	while (markers.length > 0) {
		markers.pop().setMap(null);
	}

	if(markerCluster != null) {
		markerCluster.clearMarkers();
	}
};

function clearMap(event) {
	clearDirections();
	clearPolygons();
	clearMarkers();

	if(event != null) {
		if(form != null)
			form.setMap(null);

		form = event;
	}
};

function getPois(coords) {
	var parameters = {
		"coords": coords,
		"limit": -1
	};
	mClient.getPois(parameters, handleResults, handleMapError);
	latLng = coords;
};

function getEvents(coords) {
	var parameters = {
		"coords": coords,
		"limit": -1
	};
	mClient.getEvents(parameters, handleResults, handleMapError);
	latLng = coords;
};

function getRoutes(coords) {
	var parameters = {
		"coords": coords,
		"limit": -1
	};
	mClient.getRoutes(parameters, handleResults, handleMapError);
	latLng = coords;
};

function showDescription(mTitle, mDescription) {
	var html = '<h5>' + mTitle + '</h5><p>' + mDescription + '</p>';
	$('#text-container').hide();
	$('#msg').html(html);
	$('#text-container').fadeIn('slow');
	resize();
};

function reloadDescription(lang) {
	var title = viewing.title[lang], description = viewing.description[lang];
	if(title == undefined)
		title = 'No title available in ' + lang;

	if(description == undefined)
		description = 'No description available in ' + lang;

	showDescription(title, description);
	return false;
};

function generateOverlay(mTitle, mLatLng, mDescription) {
	var lat = mLatLng.getLocation().getLatitude(),
	lon = mLatLng.getLocation().getLongitude(),
	myLatlng = new google.maps.LatLng(lat, lon),
	marker,
	links = 'Show text in ',
	title = null,
	description = null,
	data = {
		title: mTitle,
		description: mDescription
	}; 

	for(var key in mTitle) {
		if(title == null)
			title = mTitle[key];

		links += '<a onclick="return reloadDescription(\''+ key +'\')" href="#">' + key + '</a> ';
	}

	for(var key in mDescription) {
		if(description == null)
			description = mDescription[key];

		if(mTitle[key] == undefined)
			links += '<a onclick="return reloadDescription(\''+ key +'\')" href="#">' + key + '</a> ';
	}

	marker = new google.maps.Marker({
		position : myLatlng,
		title : title
	});

	marker.setMap(map);

	google.maps.event.addListener(marker, 'click', function() {
		if (bouncyBob != null)
			bouncyBob.setAnimation(null);

		this.setAnimation(google.maps.Animation.BOUNCE);
		bouncyBob = this;
		viewing = data;
		$('#lang').html(links);
		showDescription(title, description);
	});

	markers.push(marker);
	return marker;
};

function generatePolyline(mTitle, mDescription, polygon) {
	var lineCoordinates = [],
	coords = polygon.getValues(),
	links = 'Show text in ',
	title = null,
	description = null,
	data = {
		title: mTitle,
		description: mDescription
	},
	lat, lng, polygon; 

	for (key in coords) {
		lat = coords[key].getLatitude();
		lng = coords[key].getLongitude();
		lineCoordinates.push(new google.maps.LatLng(lat, lng));
	}

	polygon = new google.maps.Polygon({
		path : lineCoordinates,
		geodesic : false,
		strokeColor : '#008000',
		strokeOpacity : 0.8,
		fillColor: "#CCCCCC",
		fillOpacity: 0.35,
		strokeWeight : 3
	});

	if(checked)
		polygon.setMap(map);

	for(var key in mTitle) {
		if(title == null)
			title = mTitle[key];

		links += '<a onclick="return reloadDescription(\''+ key +'\')" href="#">' + key + '</a> ';
	}

	for(var key in mDescription) {
		description = mDescription[key]
		break;
	}

	google.maps.event.addListener(polygon, 'click', function(e) {
		viewing = data;
		$('#lang').html(links);
		showDescription(title, description);
	});

	polygons.push(polygon);
};

function getTitles(poi) {
	var langLabel = DataReader.getAvailableLanguages(poi, 'label'),
	title = [];

	for(var key in langLabel)
		title[key] = DataReader.getLabel(poi, term.LABEL_TERM_PRIMARY, langLabel[key]);

	if(Object.keys(title).length == 0)
		title['en'] = "No titles available";

	return title;
};

function getDescriptions(poi) {
	var langDescription = DataReader.getAvailableLanguages(poi, 'description'),
	description = [];

	for(var key in langDescription)
		description[key] = DataReader.getDescription(poi, langDescription[key]);

	if(Object.keys(description).length == 0)
		description['en'] = "No descriptions available";

	return description;
};

function handlePois(data) {
	var list = data.poi;

	$('#text-container').hide();
	$('#route-select').hide();
	for (var key in list) {
		var poi = list[key],
		title = getTitles(poi),
		description = getDescriptions(poi);

		var myLatLng = DataReader.getLocationGeometry(poi, term.POINT_TERM_ENTRANCE);
		for (var key in myLatLng) {
			if (myLatLng[key].getNumGeo() == 1)
				generateOverlay(title, myLatLng[key], description);
			else
				generatePolyline(title, description, myLatLng[key]);
		}
	}

	if(markerCluster == null)
		markerCluster = new MarkerClusterer(map, markers);
	else {
		markerCluster.addMarkers(markers, false);
	}

	hideMapLoad();
	consoleCB(mClient.getLastCall(), data, 'pois');
};

function handleEvents(data) {
	var list = data.event;

	$('#route-select').hide();
	for (var key in list) {
		var event = list[key],
		base = DataReader.getRelationshipBase(event, term.RELATIONSHIP_TERM_WITHIN),
		id = DataReader.getRelationshipId(event, term.RELATIONSHIP_TERM_WITHIN),
		title = getTitles(event),
		description = getDescriptions(event);

		var myLatLng = DataReader.getLocationGeometry(event, term.POINT_TERM_ENTRANCE);
		for (var key in myLatLng) {
			if (myLatLng[key].getNumGeo() == 1)
				generateOverlay(title, myLatLng[key], description);
			else
				generatePolyline(title, description, myLatLng[key]);
		}
	}

	if(markerCluster == null)
		markerCluster = new MarkerClusterer(map, markers);
	else
		markerCluster.clearMarkers();

	hideMapLoad();
	consoleCB(mClient.getLastCall(), data, 'events');
};

function handleRoutes(data) {
	var routes = data.routes,
	selectValues = [];

	$('#text-container').hide();
	storedRoutes = [];
	for(key in routes) {
		var route = routes[key],
		value = {
			'base' : route.base,
			'id' : route.id,
			'title' : DataReader.getLabel(route, term.LABEL_TERM_PRIMARY, "pt_PT")
		};
		selectValues.push(value);
		storedRoutes.push(value);
	}

	if(selectValues.length > 0) {
		$.each(selectValues, function(key, value) {
			$('#route').append(new Option(value.title, key));
		});
		$('#route-select').show();
		resize();
	} else {
		$("#msg").text('No results found');
	}
	hideMapLoad();
	consoleCB(mClient.getLastCall(), data, 'routes');
};

function handleRoute(data, textStatus, jqXHR) {
	var pois = data.pois,
	directions = [];

	clearMarkers();
	for (var key in pois) {
		var poi = pois[key],
		title = getTitles(poi),
		description = getDescriptions(poi), 
		myLatLng = DataReader.getLocationGeometry(poi, term.POINT_TERM_ENTRANCE),
		direction;

		for (var key in myLatLng) {
			if (myLatLng[key].getNumGeo() == 1) {
				direction = new google.maps.LatLng(myLatLng[key].getLocation().getLatitude(),
					myLatLng[key].getLocation().getLongitude());
				generateOverlay(title, myLatLng[key], description);
				directions.push(direction);
			} else {
				generatePolyline(title, description, myLatLng[key]);
			}
		}
	}

	displayDirections(directions);
	hideMapLoad();
};

function displayDirections(directions) {
	clearDirections();
	var directionsService = new google.maps.DirectionsService();
	for(var i = 0; i < directions.length - 1; i++) {
		var from = directions[i];
		var to = directions[i + 1];
		var directionsRequest = {
			origin: from,
			destination: to,
			travelMode: google.maps.DirectionsTravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC
		};

		directionsService.route(directionsRequest, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				renderers.push(new google.maps.DirectionsRenderer({
					map: map,
					directions: response,
					suppressMarkers: true
				}));
			} else
			$("#msg").append("Unable to retrieve your route");
		});
	}

	hideMapLoad();
};

function handleResults(data, textStatus, jqXHR) {
	callback[$('input[name=type]:checked', '#poi-type').val()](data);
};

function showMapLoad() {
	$('#progressbar-map').show();
	$('#mError').hide();
	$('#msg').html('');
	$('#lang').html('');
	resize();
};

function hideMapLoad() {
	$('#progressbar-map').hide();
	resize();
};

function callMethod(coords) {
	selectCoords = coords;
	call[$('input[name=type]:checked', '#poi-type').val()](selectCoords);
	showMapLoad();
};

function initializeMap() {
	if(map != null)
		return;

	var mapOptions = { center : new google.maps.LatLng(38.725279, -9.150023), zoom : 13, mapTypeId : google.maps.MapTypeId.HYBRID };
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	var drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode : null,
		drawingControl : true,
		drawingControlOptions : {
			position : google.maps.ControlPosition.TOP_CENTER,
			drawingModes : [google.maps.drawing.OverlayType.CIRCLE, google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.RECTANGLE]
		},
		markerOptions : {
			icon : 'http://www.topazenergy.ie/images/gmap-point-icon.png'
		},
		circleOptions : {
			fillColor : '#CCCCCC',
			fillOpacity : 0.4,
			strokeColor : "#FF0000",
			strokeWeight : 1,
			clickable : false,
			zIndex : 1,
			editable : true
		},
		polygonOptions : {
			fillColor : '#CCCCCC',
			fillOpacity : 0.4,
			strokeColor : "#FF0000",
			strokeWeight : 1,
			clickable : false,
			zIndex : 1,
			editable : true
		},
		polylineOptions : {
			fillColor : '#CCCCCC',
			fillOpacity : 0.4,
			strokeColor : "#FF0000",
			strokeWeight : 1,
			clickable : false,
			zIndex : 1,
			editable : true
		},
		rectangleOptions : {
			fillColor : '#CCCCCC',
			fillOpacity : 0.4,
			strokeColor : "#FF0000",
			strokeWeight : 1,
			clickable : false,
			zIndex : 1,
			editable : true
		}
	});

google.maps.event.addListener(drawingManager, 'circlecomplete', function(event) {
	var circle = event.getCenter().lat() + " " + event.getCenter().lng() + " " + event.getRadius();
	clearMap(event);
	callMethod(circle);
});

google.maps.event.addListener(drawingManager, 'polylinecomplete', function(event) {
	var line = [];
	var size = event.getPath().getLength();
	event.getPath().forEach(function(latLng, index) {
		line.push(latLng.lat() + " " + latLng.lng());
	});

	clearMap(event);
	callMethod(line);
});

google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(event) {
	var ne = event.getBounds().getNorthEast();
	var sw = event.getBounds().getSouthWest();
	var nw = {
		x : ne.lat(),
		y : sw.lng()
	};
	var se = {
		x : sw.lat(),
		y : ne.lng()
	}

	var rectangle = [];
	rectangle.push(ne.lat() + " " + ne.lng());
	rectangle.push(nw.x + " " + nw.y);
	rectangle.push(sw.lat() + " " + sw.lng());
	rectangle.push(se.x + " " + se.y);

	clearMap(event);
	callMethod(rectangle);
});

google.maps.event.addListener(drawingManager, 'polygoncomplete', function(event) {
	var polygon = [];
	var size = event.latLngs.getAt(0).getLength();
	event.latLngs.getAt(0).forEach(function(latLng, index) {
		polygon.push(latLng.lat() + " " + latLng.lng());
	});

	clearMap(event);
	callMethod(polygon);
});

drawingManager.setMap(map);

var viewControlDiv = document.createElement('div');
var viewControl = new ViewControl(viewControlDiv, map);
viewControlDiv.index = 1;
map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(viewControlDiv);

var blockControlDiv = document.createElement('div');
var blockControl = new BlocksControl(blockControlDiv, map);
blockControlDiv.index = 1;
map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(blockControlDiv);

google.maps.event.addListenerOnce(map, 'idle', function(){
	document.getElementById("polygons-show").onchange = function(){
		var m = null;
		if($(this).context.checked) {
			m = map;
		}

		checked = $(this).context.checked;
		for(var key in polygons){
			polygons[key].setMap(m);
		}
	};

	document.getElementById("poi-type").onchange = function() {
		if(selectCoords == undefined || selectCoords == null)
			return;

		$('#text-container').hide();
		$('#route-select').hide();
		clearMap(null);
		callMethod(selectCoords);
	}
});
};

/******************************/
/*           Console          */
/******************************/
function getConsoleMapPois (params) {
	clearMap();
	cClient.getPois(params, handlePois, handleMapError);
};

function getConsoleMapEvents (params) {
	clearMap();
	cClient.getEvents(params, handleEvents, handleMapError);
};

function getConsoleMapRoutes (params) {
	clearMap();
	cClient.getRoutes(params, handleRoutes, handleMapError);
};
