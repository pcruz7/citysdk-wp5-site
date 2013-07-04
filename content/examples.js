var javaExamples = [
'import citysdk.tourism.client.exceptions.ServerErrorException;
import citysdk.tourism.client.exceptions.UnknownErrorException;
import citysdk.tourism.client.requests.TourismClient;
import citysdk.tourism.client.requests.TourismClientFactory;

public TourismClient getClientWithUrl(String url){
	TourismClient client = null;
	try {
		// get a factory instance (singleton)
		TourismClientFactory factory = TourismClientFactory.getInstace();

		// get a client stub
		client = factory.getClient(url);
	} catch (IOException e) {
		// mainly socket errors
		e.printStackTrace();
	} catch (UnknownErrorException e) {
		// mainly message format errors
		e.printStackTrace();
	} catch (ServerErrorException e) {
		// mainly server side errors, e.g.: HTTP 400 error
		e.printStackTrace();
	}

	return client;
}',
'import citysdk.tourism.client.exceptions.InvalidParameterException;
import citysdk.tourism.client.exceptions.ParameterNotAllowedException;
import citysdk.tourism.client.exceptions.ServerErrorException;
import citysdk.tourism.client.exceptions.UnknownErrorException;
import citysdk.tourism.client.requests.TourismClient;
import citysdk.tourism.client.requests.TourismClientFactory;
import citysdk.tourism.client.requests.Parameter;
import citysdk.tourism.client.requests.ParameterList;
import citysdk.tourism.client.terms.ParameterTerms;
import citysdk.tourism.client.poi.lists.ListEvent;

public ListEvent getListEvents(ParameterList parameterList, String url) {
	ListEvent list = null;
	try {
		// get a factory instance
		TourismClientFactory factory = TourismClientFactory.getInstance();
		
		// get a client for the given URL
		TourismClient client = factory.getClient(url)
		
		// get a list of events
		list = client.getEvents(parameterList);
	} catch (IOException e) {
		// mainly socket errors
		e.printStackTrace();
	} catch (InvalidParameterException e) {
		// exception thrown if any parameter in the parameter list is invalid
		// such as POI_CATEGORY, instead of EVENT_CATEGORY
		e.printStackTrace();
	} catch (ParameterNotAllowedException e) {
		// exception thrown if any parameter in the parameter list is 
		// unavailable for the given uRL
		e.printStackTrace();
	} catch (UnknownErrorException e) {
		// mainly message format errors
		e.printStackTrace();
	} catch (ServerErrorException e) {
		// mainly server side errors, e.g.: HTTP 400 error
		e.printStackTrace();
	}

	return list;
}

...
String uri = "http://some-url.com/";
// make the parameter list and make the request
List&lt;Integer&gt; show = new ArrayList&lt;Integer&gt;();
show.add(0);
show.add(19);

List&lt;String&gt; category = new ArrayList&lt;String&gt;();
category.add("Music");
category.add("Live");

ParameterList params = new ParameterList();
params.add(new Parameter(ParameterTerms.CATEGORY, category));
params.add(new Parameter(ParameterTerms.TAG, "rock"));
params.add(new Parameter(ParameterTerms.SHOW, show));
ListEvent eventList = getListEvents(params, uri);
...'
];