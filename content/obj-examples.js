var objCreate =
'#import &lt;CitySDK/TourismClientFactory.h&gt;\n'+
'\n'+
'- (TourismClient *) getClientWithUrl:(NSString *) url \n'+
'{\n'+
'	NSError* err;\n'+
'	// get a factory instance\n'+
'	TourismClientFactory* factory = [TourismClientFactory getInstance];\n'+
'\n'+
'	// create a client stub\n'+
'	TourismClient* client = [factory getClient:url :&err];\n'+
'\n'+
'	// handle any error that might occur\n'+
'	if(err)\n'+
'		NSLog(@"$@", [err description]);\n'+
'\n'+
'	return client;\n'+
'}';

var objUse =
'#import &lt;CitySDK/TourismClientFactory.h&gt;\n'+
'\n'+
'- (ListEvent *) getListOfEventsFromUrl:(NSString *) url withParams:(ParameterList *) list\n'+
'{\n'+
'	NSError* err;\n'+
'	ListEvent* eventList = nil;\n'+
'\n'+
'	// get a factory instance\n'+
'	TourismClientFactory* factory = [TourismClientFactory getInstance];\n'+
'\n'+
'	// create a client stub\n'+
'	TourismClient* client = [factory getClient:url :&err];\n'+
'\n'+
'	// handle any error that might occur\n'+
'	if(err)\n'+
'		NSLog(@"$@", [err description]);\n'+
'	else {\n'+
'		// get a list of events\n'+
'		eventList = [client getEvents:list :&err];\n'+
'\n'+
'		// handle any error that might occur\n'+
'		if(err) {\n'+
'			NSLog(@"$@", [err description]);\n'+
'		}\n'+
'	}\n'+
'	\n'+
'	return eventList;\n'+
'}\n'+
'\n'+
'...\n'+
'ParameterList* list = [[ParameterList alloc] init];\n'+
'[list add:[[Parameter alloc] initWithName:[ParameterTerms getTerm:CATEGORY] \n'+
'	andValue:@"Music" :&err]];\n'+
'[list add:[[Parameter alloc] initWithName:[ParameterTerms getTerm:EVENT] \n'+
'	andValue:@"Steve Vai" :&err]];\n'+
'ListEvent* events = [self getListOfEventsFromUrl:@"http://some-url.pt" withParams:list];\n'+
'...';

var objCategories = 
'#import &lt;CitySDK/TourismClientFactory.h&gt;\n'+
'\n'+
'- (ListEvent *) getCategoriesFromUrl:(NSString *) url withList:(ParameterList *) list\n'+
'{\n'+
'	NSError* err;\n'+
'	Category* categories = nil;\n'+
'	\n'+
'	// get a factory instance\n'+
'	TourismClientFactory* factory = [TourismClientFactory getInstance];\n'+
'	\n'+
'	// create a client stub\n'+
'	TourismClient* client = [factory getClient:url :&err];\n'+
'	\n'+
'	// handle any error that might occur\n'+
'	if(err)\n'+
'		NSLog(@"$@", [err description]);\n'+
'	else {\n'+
'		// get categories\n'+
'		categories = [client getCategories:list :&err];\n'+
'\n'+
'		// handle any error that might occur\n'+
'		if(err) {\n'+
'			NSLog(@"$@", [err description]);\n'+
'		}\n'+
'	}\n'+
'\n'+
'	return categories;\n'+
'}\n'+
'\n'+
'...\n'+
'ParameterList* list = [[ParameterList alloc] init];\n'+
'[list add:[[Parameter alloc] initWithName:[ParameterTerms getTerm:LIST] \n'+
'	andValue:@"poi" :&err]];\n'+
'Category* categories = [self getCategoriesFromUrl:@"http://some-url.pt" \n'+
'	withList:list];\n'+
'...';

var objPoi =
'#import &lt;CitySDK/TourismClientFactory.h&gt;\n'+
'\n'+
'- (PointOfInterest *) getPoiFromUrl:(NSString *) url withBase:(NSString *) base \n'+
'	andId:(NSString *) baseID\n'+
'{\n'+
'	NSError* err;\n'+
'	PointOfInterest* poi = nil;\n'+
'	\n'+
'	// get a factory instance\n'+
'	TourismClientFactory* factory = [TourismClientFactory getInstance];\n'+
'	\n'+
'	// create a client stub\n'+
'	TourismClient* client = [factory getClient:url :&err];\n'+
'	\n'+
'	// handle any error that might occur\n'+
'	if(err)\n'+
'		NSLog(@"$@", [err description]);\n'+
'	else {\n'+
'		// get complete description of the poi\n'+
'		poi = [client getPoi:base withId:baseID :&err];\n'+
'\n'+
'		// handle any error that might occur\n'+
'		if(err) {\n'+
'			NSLog(@"$@", [err description]);\n'+
'		}\n'+
'	}\n'+
'\n'+
'	return poi;\n'+
'}\n'+
'\n'+
'...\n'+
'ListPointOfInterest* list = ...; // previously got poi list\n'+
'PointOfInterest* poi = [list getPoi: 0];\n'+
'poi = [self getPoiFromUrl:@"http://some-uri.com" withBase:poi.base andId:poi.baseID];\n'+
'...';

var objData =
'#import &lt;CitySDK/TourismClientFactory.h&gt;\n'+
'#import &lt;CitySDK/DataReader.h&gt;\n'+
'\n'+
'- (void) parseItems:(ListEvent *) list \n'+
'{  \n'+
'	// define the default language to be used, in case the wanted language\n'+
'	// does not exist. The default language - if this method is not called - is en_GB.\n'+
'	[DataReader setDefaultLocale: [[NSLocale alloc] initWithLocaleIdentifier:@"en_GB"]];\n'+
'\n'+
'	// get the default locale\n'+
'	NSLocale* locale = [[NSLocale alloc] initWithLocaleIdentifier:@"pt_PT"];\n'+
'	for(int i = 0; i &lt; [list getNumEvents]; i++) {\n'+
'		Event* event = [list getEvent:i];\n'+
'		\n'+
'		NSLog(@"Label: %@", [DataReader getLabel:event withTerm:LABEL_TERM_PRIMARY \n'+
'			andLocale:locale]);\n'+
'		NSLog(@"Description: %@", [DataReader getDescription:event withLocale:locale]);\n'+
'		NSLog(@"Contacts: %@", [DataReader getContacts:poi]);\n'+
'		NSLog(@"Calendar: %@", [DataReader getCalendar:poi withTerm:TIME_TERM_OPEN]);\n'+
'		NSLog(@"Link: %@", [DataReader getLink:poi withTerm:LINK_TERM_ALTERNATE]);\n'+
'	}\n'+
'}\n'+
'\n'+
'...\n'+
'ListEvent* list = ...; // get a list of events\n'+
'[self parseItems: list]; // parse its items\n'+
'...';