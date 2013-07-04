var dates = [], cClient, cb, calendarHome;

function loadCalendar(callback) {
	initCalendarClient("http://tourism.citysdk.cm-lisboa.pt/resources");

	var html = 
	'<div id="datepicker" style="clear: both; float: left; margin: 10px 0px 10px 0px; width: 40%">'+
	'	<div id="progressbar-cal" style="width: 93%; margin-bottom: 10px"><div class="progress-label" style="margin-left:37%">Loading...</div></div>'+
	'	<div id="category-container" style="margin-bottom: 10px">'+
	'		<label for="category" id="category-label">Show: </label>'+
	'		<select id="category" style="width: 145px"></select>'+
	'		<button id="reload">Reload</button>'+
	'	</div>'+
	'	<div id="cError" style="width: 94%; margin-bottom: 5px" class="ui-widget">'+
	'		<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> '+
	'			<p style="margin: 1em 0; ">'+
	'				<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><strong>Alert:</strong> There was an error handling the request'+
	'			</p>'+
	'		</div>'+
	'	</div>'+
	'</div>'+
	'<div id="date-text" style="float: right; width: 55%; height: 240px;">'+
	'	<div id="date-text-title"></div>'+
	'	<div id="date-text-description" style="height: 85%; overflow: auto"></div>'+
	'</div>';

	$('#calendar-container').html(html);
	cb = callback;
}

function initCalendarClient(uri) {
	TourismVisitor.visit(uri, handleCalendarVisit, handleError);
	calendarHome = uri;
};

function handleCalendarVisit(client, textStatus, jqXHR) {
	cClient = client;
	cClient.useVersion('1.0');

	cb(calendarHome, cClient.getRawResources(), 'home');
	loadCalendarWidgets();
};

function handleError(jqXHR, textStatus, errorThrown) {
	console.log(jqXHR, errorThrown, textStatus);
	$('#datepicker').css({
		width: '106%'
	});
	$('#cError').show();
	$('#progressbar-cal').hide();
	$('#category-container').hide();
	$('#date-text').hide();
	resize();
};

function handleCalendarError(jqXHR, textStatus, errorThrown) {
	console.log(jqXHR, errorThrown, textStatus);
	hideCalendarLoad();
	$('#cError').show();
	$('#category-container').hide();
	cb(cClient.getLastCall(), textStatus, 'home');
};

function loadCalendarWidgets() {
	$('#calendar-container').css({
		'margin-top': '5px',
		'border': '1px solid #c9c9c9',
		'border-radius': '5px',
		'padding': '10px 10px 10px 10px',
		'width': '97%',
		'height': '270px'
	});
	
	$('#progressbar-cal').progressbar({
		value: false
	});

	showCalendarLoad();

	$('#cError').hide();
	$("#reload").click(function() {
		fetchData();
	});

	var parameters = {
		'list': parameterTerms.EVENTS,
		'limit': -1
	};

	$('#datepicker').datepicker({
		beforeShowDay: function(date) {
			for (var key in dates) { 
				if (key == convertDateToString(new Date(date))) {
					return [true, 'highlight'];
				}
			}

			return [true];
		},

		onSelect: function(date) {
			displayContent(dates[date], date);			
		},

		dateFormat: 'dd/mm/yy'
	});

	cClient.getCategories(parameters, handleCategories, handleCalendarError);
};

function displayContent(data, date) {
	if(data == undefined
		|| data == null)
		return;

	$('#date-text').hide();
	$('#date-text-title').html('<h5>' + data['title'] + ' (' + date + ')</h5>');

	var links = data['links'],
	more = null,
	imgs = '';
	for(var key in links) {
		var link = links[key];

		if(link.type.indexOf('image') !== -1) {
			imgs += '<p><a href="' + link.href+'" target="_blank"><img width="50%" src="' + link.href + '"/></a></p>';
		} else {
			if(more == null)
				more = '<p>Related information: ';
			more += '<p><a href="' + link.href + '" target="_blank">' + link.href + '</p>';
		}
	}

	more = (more == null) ? '' : more;

	$('#date-text-description').html(data['description'] + imgs + more + '</p>');
	$('#date-text').fadeIn("slow");
};

function showCalendarLoad() {
	$('#progressbar-cal').show();
	$('#category-container').hide();
	$('#cError').hide();
};

function hideCalendarLoad() {
	$('#progressbar-cal').hide();
	$('#category-container').show();
};

function reloadCalendar(data, textStatus, jqXHR) {
	var events = data['event'],
	index = 0,
	l_lang = "pt_PT",
	event, cal, ical, jsonCal, date, title, description, list, content;

	cb(cClient.getLastCall(), data, 'events');
	dates = [];
	for(var key in events) {
		event = events[key];

		// get date
		vcal = DataReader.getCalendar(event, term.TIME_TERM_OPEN);
		if(vcal != false) {
			ical = $.icalendar.parse(vcal);
			jsonCal = jQuery.parseJSON($.toJSON(ical, true));
			if(jsonCal.vevent.dtstart != undefined)
				date = Date.parse(jsonCal.vevent.dtstart._value);
			else
				date = Date.parse(jsonCal.vevent.dtstamp);

			title = DataReader.getLabel(event, term.LABEL_TERM_PRIMARY, l_lang);
			description = DataReader.getDescription(event, l_lang);

			list = DataReader.getThumbnails(event);
			if(list.length > 0) {
				content = list[0];
				if(content.hasImgUri())
					description += '<p><img src="' + content.getContent() + '"></p>';
			}

			dates[convertDateToString(new Date(date))] = {
				"title": title,
				"description": description,
				"links": event.link
			}
		}
	}

	hideCalendarLoad();
	$('#datepicker').datepicker('refresh');
};

function convertDateToString(date) {
	var mm = date.getMonth() + 1,
	dd = date.getDate(),
	yy = date.getFullYear();

	return ((dd < 10) ? ('0' + dd) : dd) + '/' + ((mm < 10) ? ('0' + mm) : mm) + '/' + date.getFullYear();
};

function fetchData(params) {
	var date = new Date(),
	yy = date.getFullYear(),
	dd = date.getDate(),
	mm = (date.getMonth() + 1),
	days = daysInMonth(date.getMonth() + 1, date.getFullYear()),
	start = yy + "-" + ((mm < 10) ? ('0' + mm) : mm) + "-" + ((dd < 10) ? ('0' + dd) : dd),
	end = yy + "-" + ((mm < 10) ? ('0' + mm) : mm) + "-" + ((days < 10) ? ('0' + days) : days),
	dateParam = start + " " + end,
	parameters, categoryParam = null;

	if ($("#category").val())
		categoryParam = $("#category").val();

	if(categoryParam != null){
		parameters = {
			"time" : dateParam,
			"category" : categoryParam,
			"limit": -1
		};
	} else
	parameters = { 
		"time": dateParam,
		"limit": -1 
	};

	showCalendarLoad();
	cClient.getEvents(parameters, reloadCalendar, handleCalendarError);
};

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
};

function handleCategories(data, textStatus, jqXHR) {
	var newOptions = getCategories(data),
	el = $("#category");

	cb(cClient.getLastCall(), data, 'categories');
	el.empty();
	for (var key in newOptions) {
		el.append($("<option></option>").attr("value", newOptions[key]).text(newOptions[key]));
	}

	hideCalendarLoad();
};

function getLang(lang) {
	return lang.replace("-", "_").split("_")[0];
};

function getCategories(data) {
	var options = [];
	getSubCategories(options, data, "");
	return options;
};

function getSubCategories(options, data, space) {
	var sLang = getLang("pt_PT"),
	categories = data.categories, category;
	for (var key in categories) {
		category = categories[key];
		if (getLang(category.lang) == sLang) {
			options[options.length + 1] = space + DataReader.getLabel(category, 'primary', 'pt-PT');
		}

		if (categories[key].categories != undefined && categories[key].categories.length > 0) {
			getSubCategories(options, categories[key], space + "-");
		}
	}
};

/******************************/
/*           Console          */
/******************************/
function getConsoleCalendarCategories (params) {
	cClient.getCategories(params, handleCategories, handleCalendarError);
};

function getConsoleCalendarEvents (params) {
	cClient.getEvents(params, reloadCalendar, handleCalendarError);
};

