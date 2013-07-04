var jsCreate = 
'<!-- or any jquery lib that you wish -->\n'+
'<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>\n'+
'<!-- load the library -->\n'+
'<script type="text/javascript" src="js/jquery.citysdk-tourism.min.js" ></script>\n'+
'\n'+
'<script type="text/javascript">\n'+
'$(document).ready(function() {\n'+
'	init("http://some-url.com/");\n'+
'});\n'+
'\n'+
'// make the call\n'+
'function init(uri) {\n'+
'	// handleVisit is the callback for a success call, handleError for error situations\n'+
'	TourismVisitor.visit(uri, handleVisit, handleError);\n'+
'}\n'+
'\n'+
'// method to handle the erroneous calls\n'+
'// its parameters are similar to an Ajax call\n'+
'function handleError(jqXHR, textStatus, errorThrown) {\n'+
'	console.log(jqXHR, errorThrown, textStatus);\n'+
'}\n'+
'\n'+
'// method to handle the data\n'+
'// in this case it will receive the client as a first parameter\n'+
'function handleVisit(client, textStatus, jqXHR) {\n'+
'	var mClient = client;\n'+
'	// do some work\n'+
'}\n'+
'</script>';

var jsUse = 
'<!-- or any jQuery lib that you wish -->\n'+
'<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>\n'+
'<!-- load the library -->\n'+
'<script type="text/javascript" src="js/jquery.citysdk-tourism.min.js" ></script>\n'+
'\n'+
'<script type="text/javascript">\n'+
'$(document).ready(function() {\n'+
'	init("http://some-url.com/");\n'+
'});\n'+
'\n'+
'// make the call\n'+
'function init(uri) {\n'+
'	// handleVisit is the callback for a success call, handleError for error situations\n'+
'	TourismVisitor.visit(uri, handleVisit, handleError);\n'+
'}\n'+
'\n'+
'// method to handle the erroneous calls\n'+
'// its parameters are similar to an Ajax call\n'+
'function handleError(jqXHR, textStatus, errorThrown) {\n'+
'	console.log(jqXHR, errorThrown, textStatus);\n'+
'}\n'+
'\n'+
'// method to handle the visit\n'+
'// in this case it will receive the client as a first parameter\n'+
'function handleVisit(client, textStatus, jqXHR) {\n'+
'	var mClient = client;\n'+
'\n'+
'	// initialize the wanted parameters\n'+
'	var mClient = client, \n'+
'		categories = ["music", "live"], \n'+
'		tags = "rock", \n'+
'		parameters = {\n'+
'			"category" : categories,\n'+
'			"tag" : tags\n'+
'		};\n'+
'\n'+
'	mClient.useVersion("1.0");\n'+
'	try {\n'+
'		mClient.getEvents(parameters, handleEvents, handleError);\n'+
'	} catch(e) {\n'+
'		console.log(e);\n'+
'	}\n'+
'}\n'+
'\n'+
'// method to handle the data\n'+
'// in this case it will receive a list of Events as a first parameter\n'+
'function handleEvents(data, textStatus, jqXHR) {\n'+
'	var listEvents = data;\n'+
'	console.log(listEvents);\n'+
'}\n'+
'</script>';

var jsCategories =
'<!-- or any jQuery lib that you wish -->\n'+
'<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>\n'+
'<!-- load the library -->\n'+
'<script type="text/javascript" src="js/jquery.citysdk-tourism.min.js" ></script>\n'+
'\n'+
'<script type="text/javascript">\n'+
'$(document).ready(function() {\n'+
'	init("http://some-url.com/");\n'+
'});\n'+
'\n'+
'// make the call\n'+
'function init(uri) {\n'+
'	// handleVisit is the callback for a success call, handleError for error situations\n'+
'	TourismVisitor.visit(uri, handleVisit, handleError);\n'+
'}\n'+
'\n'+
'// method to handle the erroneous calls\n'+
'// its parameters are similar to an Ajax call\n'+
'function handleError(jqXHR, textStatus, errorThrown) {\n'+
'	console.log(jqXHR, errorThrown, textStatus);\n'+
'}\n'+
'\n'+
'// method to handle the visit\n'+
'// in this case it will receive the client as a first parameter\n'+
'function handleVisit(client, textStatus, jqXHR) {\n'+
'	var mClient = client,\n'+
'		parameters = {\n'+
'			\'list\': parameterTerms.POIS\n'+
'		};\n'+
'	try {\n'+
'		mClient.getCategories(parameters, handleCategories, handleError);\n'+
'	} catch(e) {\n'+
'		console.log(e);\n'+
'	}\n'+
'}\n'+
'\n'+
'// method to handle the data\n'+
'// in this case it will receive a Category list as a first parameter\n'+
'function handleCategories(data, textStatus, jqXHR) {\n'+
'	var categories = data;\n'+
'	console.log(categories);\n'+
'}\n'+
'</script>';

var jsPoi =
'<!-- or any jQuery lib that you wish -->\n'+
'<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>\n'+
'<!-- load the library -->\n'+
'<script type="text/javascript" src="js/jquery.citysdk-tourism.min.js" ></script>\n'+
'\n'+
'<script type="text/javascript">\n'+
'var mClient;\n'+
'\n'+
'$(document).ready(function() {\n'+
'	init("http://some-url.com/");\n'+
'});\n'+
'\n'+
'// make the call\n'+
'function init(uri) {\n'+
'	// handleVisit is the callback for a success call, handleError for error situations\n'+
'	TourismVisitor.visit(uri, handleVisit, handleError);\n'+
'}\n'+
'\n'+
'// method to handle the erroneous calls\n'+
'// its parameters are similar to an Ajax call\n'+
'function handleError(jqXHR, textStatus, errorThrown) {\n'+
'	console.log(jqXHR, errorThrown, textStatus);\n'+
'}\n'+
'\n'+
'// method to handle the visit\n'+
'// in this case it will receive the client as a first parameter\n'+
'function handleVisit(client, textStatus, jqXHR) {\n'+
'	mClient = client;\n'+
'\n'+
'	// initialize the wanted parameters\n'+
'	var categories = ["museum", "garden"], \n'+
'		tags = "nature", \n'+
'		parameters = {\n'+
'			"category" : categories,\n'+
'			"tag" : tags\n'+
'		};\n'+
'\n'+
'	mClient.useVersion("1.0");\n'+
'	try {\n'+
'		mClient.getPois(parameters, handlePois, handleError);\n'+
'	} catch(e) {\n'+
'		console.log(e);\n'+
'	}\n'+
'}\n'+
'\n'+
'// method to handle the data\n'+
'// in this case it will receive a list of POIs as a first parameter\n'+
'function handlePois(data, textStatus, jqXHR) {\n'+
'	var list = data.poi;\n'+
'\n'+
'	// go through the list of POIs\n'+
'	for (var key in list) {\n'+
'		var poi = list[key];\n'+
'\n'+
'		// and get a POI with the given base and id\n'+
'		// set the corresponding callbacks for data and error situations\n'+
'		mClient.getPoi(poi.base, poi.id, handlePoi, handleError);\n'+
'	}\n'+
'}\n'+
'\n'+
'// method to handle the data\n'+
'// in this case it will receive a single POI as a first parameter\n'+
'function handlePoi(data, textStatus, jqXHR) {\n'+
'	var poi = data;\n'+
'	console.log(poi);\n'+
'}\n'+
'\n'+
'</script>';

var jsData = 
'<!-- or any jQuery lib that you wish -->\n'+
'<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>\n'+
'<!-- load the library -->\n'+
'<script type="text/javascript" src="js/jquery.citysdk-tourism.min.js" ></script>\n'+
'\n'+
'<script type="text/javascript">\n'+
'var mClient;\n'+
'\n'+
'$(document).ready(function() {\n'+
'	init("http://some-url.com/");\n'+
'});\n'+
'\n'+
'// make the call\n'+
'function init(uri) {\n'+
'	// handleVisit is the callback for a success call, handleError for error situations\n'+
'	TourismVisitor.visitHome(uri, handleVisit, handleError);\n'+
'}\n'+
'\n'+
'// method to handle the erroneous calls\n'+
'// its parameters are similar to an Ajax call\n'+
'function handleError(jqXHR, textStatus, errorThrown) {\n'+
'	console.log(jqXHR, errorThrown, textStatus);\n'+
'}\n'+
'\n'+
'// method to handle the visit\n'+
'// in this case it will receive the client as a first parameter\n'+
'function handleVisit(client, textStatus, jqXHR) {\n'+
'	mClient = client;\n'+
'\n'+
'	// initialize parameters\n'+
'	var categories = ["music", "live"], \n'+
'		tags = "rock", \n'+
'		parameters = {\n'+
'			"category" : categories,\n'+
'			"tag" : tags\n'+
'		};\n'+
'\n'+
'	mClient.useVersion("1.0");\n'+
'	try {\n'+
'		mClient.getEvents(parameters, handleEvents, handleError);\n'+
'	} catch(e) {\n'+
'		console.log(e);\n'+
'	}\n'+
'}\n'+
'\n'+
'// method to handle the data\n'+
'// in this case it will receive a list of POIs as a first parameter\n'+
'function handleEvents(data, textStatus, jqXHR) {\n'+
'	var list = data.event;\n'+
'\n'+
'	// set the default language to en_GB. If this method is not called\n'+
'	// its default is en_GB\n'+
'	DataReader.setDefaultLanguage("en_GB");\n'+
'	// go through the list of events\n'+
'	for (var key in list) {\n'+
'		var event = list[key],\n'+
'			// get the primary label in PT language\n'+
'			label = DataReader.getLabel(event, term.LABEL_TERM_PRIMARY, "pt_PT"),\n'+
'			// get a description in PT language\n'+
'			description = DataReader.getDescription(event, "pt_PT");\n'+
'\n'+
'		// get a thumbnail (URI or base-64 image)\n'+
'		var img = DataReader.getThumbnails(event),\n'+
'			imgContent = null,\n'+
'			thumbnail = "",\n'+
'		if(img.length > 0) {\n'+
'			imgContent = img[0];\n'+
'			thumbnail = imgContent.getContent();\n'+
'		}\n'+
'		\n'+
'		// get an image (always a URI)\n'+
'		var imgUri = DataReader.getImagesUri(event),\n'+
'			image = null;\n'+
'		if(imgUri.length > 0)\n'+
'			image = imgUri.getContent();\n'+
'\n'+
'		// print values\n'+
'		console.log("Label: " + label);\n'+
'		console.log("Description: " + description);\n'+
'		if(imgContent != null) {\n'+
'			console.log("THUMBNAIL (URI?: " + imgContent.hasImgUri() + ")" + ";(BYTE-CODE?: " + imgContent.hasImgByteCode() + ") : " + thumbnail);\n'+
'		} else {\n'+
'			console.log("THUMBNAIL: " + thumbnail);\n'+
'		}\n'+
'		console.log("IMAGE: " + image);\n'+
'	}\n'+
'}\n'+
'\n'+
'</script>';