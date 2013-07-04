var javaCreate =
'import java.io.IOException;\n'+
"import citysdk.tourism.client.exceptions.ServerErrorException;\n" + 
"import citysdk.tourism.client.exceptions.UnknownErrorException;\n" + 
"import citysdk.tourism.client.requests.TourismClient;\n" +
"import citysdk.tourism.client.requests.TourismClientFactory;\n\n" +

"public TourismClient getClientWithUrl(String url)\n" +
"	throws IOException, UnknownErrorException, ServerErrorException {\n" +
	"\tTourismClient client = null;\n\n" +
		"\t// get a factory instance (singleton)\n" +
		"\tTourismClientFactory factory = TourismClientFactory.getInstace();\n\n" +

		"\t// get a client stub\n" +
		"\tclient = factory.getClient(url);\n\n" +
	"\treturn client;\n" +
"}";

var javaUse = 
'import java.io.IOException;\n'+
'import citysdk.tourism.client.exceptions.InvalidParameterException;\n'+
'import citysdk.tourism.client.exceptions.InvalidValueException;\n'+
'import citysdk.tourism.client.exceptions.ResourceNotAllowedException;\n'+
'import citysdk.tourism.client.exceptions.ServerErrorException;\n'+
'import citysdk.tourism.client.exceptions.UnknownErrorException;\n'+
'import citysdk.tourism.client.exceptions.VersionNotAvailableException;\n'+
'import citysdk.tourism.client.requests.TourismClient;\n'+
'import citysdk.tourism.client.requests.TourismClientFactory;\n'+
'import citysdk.tourism.client.requests.Parameter;\n'+
'import citysdk.tourism.client.requests.ParameterList;\n'+
'import citysdk.tourism.client.terms.ParameterTerms;\n'+
'import citysdk.tourism.client.poi.lists.ListEvent;\n'+
'\n'+
'public ListEvent getListEvents(ParameterList parameterList, String url) \n' +
'	throws InvalidParameterException, IOException, ResourceNotAllowedException,\n' +
'		   UnknownErrorException, ServerErrorException, VersionNotAvailableException,\n'+
'		   InvalidValueException {\n'+
'	ListEvent list = null;\n'+
'\n' +
'	// get a factory instance\n'+
'	TourismClientFactory factory = TourismClientFactory.getInstance();\n'+
'\n'+
'	// get a client for the given URL\n'+
'	TourismClient client = factory.getClient(url)\n'+
'	// set it to use the version 1.0\n' +
'	client.useVersion("1.0");\n' +
'\n'+
'	// get a list of events\n'+
'	list = client.getEvents(parameterList);\n'+
'\n'+
'	return list;\n'+
'}\n'+
'\n'+
'...\n'+
'String uri = "http://some-url.com/";\n'+
'// make the parameter list and make the request\n'+
'List&lt;String&gt; category = new ArrayList&lt;String&gt;();\n'+
'category.add("Music");\n'+
'category.add("Live");\n'+
'\n'+
'ParameterList params = new ParameterList();\n'+
'params.add(new Parameter(ParameterTerms.CATEGORY, category));\n'+
'params.add(new Parameter(ParameterTerms.TAG, "rock"));\n'+
'\n'+
'// do bear in mind to catch all the exceptions\n' +
'ListEvent eventList = getListEvents(params, uri);\n'+
'...';

var javaCategories = 
'import java.io.IOException;\n'+
'import citysdk.tourism.client.exceptions.InvalidParameterTermException;\n'+
'import citysdk.tourism.client.exceptions.InvalidParameterException;\n'+
'import citysdk.tourism.client.exceptions.InvalidValueException;\n'+
'import citysdk.tourism.client.exceptions.ResourceNotAllowedException;\n'+
'import citysdk.tourism.client.exceptions.ServerErrorException;\n'+
'import citysdk.tourism.client.exceptions.UnknownErrorException;\n'+
'import citysdk.tourism.client.exceptions.VersionNotAvailableException;\n'+
'import citysdk.tourism.client.requests.TourismClient;\n'+
'import citysdk.tourism.client.requests.TourismClientFactory;\n'+
'import citysdk.tourism.client.requests.ParameterList;\n'+
'import citysdk.tourism.client.poi.single.Category;\n'+
'\n'+
'public Category getCategories(ParameterList list, String url)\n' +
'	 throws IOException, UnknownErrorException, InvalidParameterTermException,\n' + 
'			ServerErrorException, ResourceNotAllowedException,\n'+ 
'			VersionNotAvailableException, InvalidParameterException,\n'+
' 			InvalidValueException {\n'+
'	Category categories = null;\n'+
'\n'+
'	// get a factory instance\n'+
'	TourismClientFactory factory = TourismClientFactory.getInstance();\n'+
'	// get a client for the given URL\n'+
'	TourismClient client = factory.getClient(url)\n'+
'	// set it to use the version 1.0\n' +
'	client.useVersion("1.0");\n' +
'\n'+
'	// get a list of categories\n'+
'	categories = client.getCategories(list);\n'+
'\n'+
'	return categories;\n'+
'}\n'+
'\n'+
'...\n'+
'String uri = "http://some-url.com/";\n'+
'// get a list of categories for POIs\n'+
'ParameterList list = new ParameterList();\n'+
'list.add(new Parameter(ParameterTerms.LIST, ParameterTerms.POIS.getTerm()));\n'+
'Category category = getCategories(list, uri);\n'+
'...';

var javaPoi = 
'import java.io.IOException;\n'+
'import citysdk.tourism.client.exceptions.InvalidParameterException;\n'+
'import citysdk.tourism.client.exceptions.InvalidValueException;\n'+
'import citysdk.tourism.client.exceptions.ResourceNotAllowedException;\n'+
'import citysdk.tourism.client.exceptions.ServerErrorException;\n'+
'import citysdk.tourism.client.exceptions.UnknownErrorException;\n'+
'import citysdk.tourism.client.exceptions.VersionNotAvailableException;\n'+
'import citysdk.tourism.client.requests.TourismClient;\n'+
'import citysdk.tourism.client.requests.TourismClientFactory;\n'+
'import citysdk.tourism.client.requests.ParameterList;\n'+
'import citysdk.tourism.client.poi.single.Event;\n'+
'\n'+
'public PointOfInterest getPoiWithId(String base, String id, String url) {\n'+
'	throws InvalidParameterException, IOException, ResourceNotAllowedException,\n' +
'		   UnknownErrorException, ServerErrorException, VersionNotAvailableException,\n'+
'		   InvalidValueException {\n'+
'	PointOfInterest poi = null;\n'+
'\n'+
'	// get a factory instance\n'+
'	TourismClientFactory factory = TourismClientFactory.getInstance();\n'+
'\n'+
'	// get a client for the given URL\n'+
'	TourismClient client = factory.getClient(url)\n'+
'	// set it to use the version 1.0\n' +
'	client.useVersion("1.0");\n' +
'\n'+
'	// get a poi\n'+
'	poi = client.getPoi(base, id);\n'+
'\n'+
'	return poi;\n'+
'}\n'+
'\n'+
'...\n'+
'String uri = "http://some-url.com/";\n'+
'ListPointOfInterest list = ...; // previously got poi list\n'+
'PointOfInterest poi = list.get(0);\n'+
'poi = getPoiWithId(poi.getBase(), poi.getId(), uri);\n'+
'...';

var javaReader = 
'import citysdk.tourism.client.parser.DataReader;\n'+
'import citysdk.tourism.client.parser.data.ImageContent;\n'+
'import citysdk.tourism.client.parser.data.PointContent;\n'+
'import citysdk.tourism.client.requests.ParameterList;\n'+
'import citysdk.tourism.client.poi.lists.ListPOI;\n'+
'import citysdk.tourism.client.poi.single.POI;\n'+
'import citysdk.tourism.client.terms.Term;\n'+
'\n'+
'public void parseItems(POIS&lt;POI&gt; poi) {\n'+
'	String label = null;\n'+
'	String description = null;\n'+
'	String thumbnail = null;\n'+
'	String image = null;\n'+
'\n'+
'	// define the default language to be used, in case the wanted language\n'+
'	// does not exist. The default language - if this method is not called - is en_GB.\n'+
'	DataReader.setDefaultLocale(new Locale("en","GB"));\n'+
'\n'+
'	// get the default locale\n'+
'	Locale locale = new Locale("pt", "PT");\n'+
'\n'+
'	for(int i = 0; i &lt; poi.size(); i++) {\n'+
'	// go through the list of objects\n'+
'	POI item = poi.get(i);\n'+
'\n'+
'	// get the primary label in PT language\n'+
'	label = DataReader.getLabel(item, Term.LABEL_TERM_PRIMARY, locale);\n'+
'\n'+
'	// get a description in PT language\n'+
'	description = DataReader.getDescription(item, locale);\n'+
'\n'+
'	// get a thumbnail (URI or base-64)\n'+
'	List&lt;ImageContent&gt; img = DataReader.getThumbnails(item);\n'+
'	ImageContent imgContent = null;\n'+
'	if(img.size() > 0) {\n'+
'		imgContent = img.get(0);\n'+
'		thumbnail = imgContent.getContent();\n'+
'	}\n'+
'\n'+
'	// get an image (always a URI)\n'+
'	List&lt;ImageContent&gt; imgUri = DataReader.getImagesUri(item);\n'+
'	if(imgUri.size() > 0)\n'+
'		image = imgUri.get(0).getContent();\n'+
'\n'+
'	// print the values\n'+
'	System.out.println("LABEL: " + label);\n'+
'	System.out.println("DESCRIPTION: " + description);\n'+
'	if(imgContent != null) {\n'+
'		System.out.println("THUMBNAIL (URI?: " + imgContent.hasImgUri() + ")" + \n'+
'		";(BYTE-CODE?: " + imgContent.hasImgByteCode() + ") : " + thumbnail);\n'+
'	} else {\n'+
'		System.out.println("THUMBNAIL: " + thumbnail);\n'+
'	}\n'+
'\n'+
'		System.out.println("IMAGE: " + image);\n'+
'	}\n'+
'}\n'+
'\n'+
'...\n'+
'// get a list from the TourismClient stub (as previously shown)\n'+
'ListEvent list = ...; \n'+
'\n'+
'// parse its values\n'+
'parseItems(list);\n'+
'...';
