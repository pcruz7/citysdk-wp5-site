var phpCreate = 
"require_once 'phar://citysdk-tourism.phar/TourismClient.php';\n" +
"\n" +
"private function getClientWithUrl($url) {\n" +
"	$client = null;\n" +
"\n" +	
"	try {\n" +
"		// create the object by passing it the url\n" +
"		$client = new TourismClient($url);\n" +
"	} catch(Exception $e) {\n" +
"		// return false in case of error\n" +
"		// (in this case the URL is not a valid CitySDK Tourism server)\n" +
"		return false;\n" +
"	}\n" +
"\n" +
"	return $client\n" +
"}\n" +
"\n"+
"$this->getClientWithUrl('http://some-uri.com');";

var phpUse = 
"require_once 'phar://citysdk-tourism.phar/TourismClient.php';\n" +
"\n" +
"private function getListEvents($params, $url) {\n" +
"	$events = null;\n" +
"\n" +	
"	try {\n" +
"		// create the object by passing it the url\n" +
"		$client = new TourismClient($url);\n" +
"		// set it to use version 1.0\n" + 
"		$client->useVersion('1.0')\n" +
"\n"+
"		// get the list of events\n" +
"		$events = $client->getEvents($params);\n"+
"	} catch(Exception $e) {\n" +
"		// return false in case of error\n" +
"		return false;\n" +
"	}\n" +
"\n" +
"	return $events\n" +
"}\n" +
"\n"+
"// build the params\n" +
"$category = array(\"Music\", \"Notícias\", \"Stuff from Stuff\");\n" +
"$params = array(\n" +
"	\"category\" => $category,\n" +
"	\"tag\" => \"rock\"\n" +
");\n" +
"\n" +
"// and invoke the events\n" +
"$this->getListEvents($params, 'http://some-uri.com');";

var phpCategories =
"require_once 'phar://citysdk-tourism.phar/TourismClient.php';\n" +
"\n" +
"private function getCategories($params, $url) {\n" +
"	$categories = null;\n" +
"\n" +	
"	try {\n" +
"		// create the object by passing it the url\n" +
"		$client = new TourismClient($url);\n" +
"		// set it to use version 1.0\n" + 
"		$client->useVersion('1.0')\n" +
"\n"+
"		// get the list of categories\n" +
"		$categories = $client->getCategories($params);\n"+
"	} catch(Exception $e) {\n" +
"		// return false in case of error\n" +
"		return false;\n" +
"	}\n" +
"\n" +
"	return $categories\n" +
"}\n\n" +
"$params = array(\n"+
"	\"list\" => 'poi',\n"+
");\n"+
"$this->getCategories($params, 'http://some-uri.com');";

var phpPoi = 
"require_once 'phar://citysdk-tourism.phar/TourismClient.php';\n" +
"\n" +
"private function testPoiWithId($params, $url) {\n" +	
"	$poi = null;\n" +
"	try {\n" +
"		// create the object by passing it the url\n" +
"		$client = new TourismClient($url);\n" +
"		// set it to use version 1.0\n" + 
"		$client->useVersion('1.0')\n" +
"\n"+
"		// get the list of pois\n" +
"		$pois = $client->getPois($params);\n"+
"		// and then the single poi\n" +
"		$poi = $this->client->getPoi($pois[0]['base'], $pois[0]['id']);\n" +
"	} catch(Exception $e) {\n" +
"		// return false in case of error\n" +
"		return false;\n" +
"	}\n\n" +
"	return $poi;\n" +
"}\n\n"+
"$category = array('Museum', 'Garden');\n"+
"$params = array(\n" +
"	'category' => $category,\n" +
"	'tag' => 'culture'\n" +
");\n" +
"$this->testPoiWithId($params, 'http://some-uri.com');";

var phpData = 
'private function readData() {\n'+
'	// prepare the parameter list\n' +
'	$category = array(\'Music\', \'Live\');\n'+
'	$tag = array(\'rock\', \'indie\');\n'+
'	$params = array(\n'+
'		\'category\' => $category,\n'+
'		\'tag\' => $tag\n'+
'	);\n'+
'		\n'+
'	// get a list of events\n' +
'	$events = $this->client->getEvents($params);\n'+
'	$lang = \'pt_PT\';\n\n'+
'	// and print its content\n' +
'	foreach($events[\'event\'] as $event) {\n'+
'		 $label = DataReader::getLabel($event, \'primary\', $lang);\n'+
'        $description = DataReader::getDescription($event, $lang);\n'+
'        $img = DataReader::getThumbnails($event);\n'+
'        $imgContent = null;\n'+
'        $thumbnail = null;\n'+
'        if(count($img) > 0) {\n'+
'            $imgContent = $img[0];\n'+
'            $thumbnail = $imgContent->content;\n'+
'        }\n'+
'	                \n'+
'        print $label;\n'+
'        print $description;\n'+
'        print $imgContent;\n'+
'	}\n'+
'}\n\n'+
'$this->readData();';
