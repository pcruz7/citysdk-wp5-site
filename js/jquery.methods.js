$(function() {
	setUpNavigation();
	setUpBackToTop();
	setUpFooter();
	setUpSliders();
	return false;
});

function setUpSideNavigation() {
	$('#side-menu a').stop().animate({
		'marginLeft':'-85px',
	},1000);

	$('#side-menu > li').hover(
		function () {
			// open
			$('a',$(this)).stop().animate({
				'marginLeft':'-2px'
			},200);
		},

		function () {
			// close
			$('a',$(this)).stop().animate({
				'marginLeft':'-85px',
			},200);
		});
}

function setUpSliders () {
	var internal = $(document).find('div[class^=internal]');

	if(internal != null) {
		internal.hide();
		$('.slider').click(function(e) {
			e.preventDefault();
			var div = $(this).children('div'),
			header = $(this).children('h5');
			div.slideToggle('fast', function (){
				if(div.is(':visible'))
					header.children("span").text("[-]");
				else
					header.children("span").text("[+]");
			});
		});
	}
};

function setUpNavigation () {
	var html = '<div id="top-menu" class="default">' +
	'<ul><li class="navi"><a class="navi" href="index.html">Home</a></li>' +
	'<li class="navi"><a class="navi" href="api.html">API</a></li>' +
	'<li class="navi"><a class="navi" href="libraries.html">Libraries</a></li>' +
	'<li class="navi"><a class="navi" href="keys.html">Developer Keys</a></li>' +
	'<li class="navi"><a class="navi" href="applications.html">Applications</a></li>' +
	'<li class="navi"><a class="navi" href="server.html">Server Reference Implementation</a></li>' + 
	'<li class="navi"><a class="navi" href="cities.html">Participating Cities</a></li>' + 
	'<li class="navi"><a class="navi" href="contacts.html">Contacts</a></li>' + 
	'</ul></div>';

	$(document).find("div[id^='navi']").html(html);
	$(document).find("div[id^='header']").html('<a href="http://www.citysdk.eu/" target="_blank"><img src="imgs/bg-citysdk-logo.png"></a>');
};

function setUpFooter () {
	var html = '<div id="footer-content">' +
	'<ul>' +
	'<li class="navi"><a target="_blank" href="http://ec.europa.eu/cip/"><img src="imgs/logo_cip.png" /></a></li>' +
	'<li class="navi"><a target="_blank" href="http://ec.europa.eu/index_en.htm"><img src="imgs/logo_eu.png" /></a></li>' + 
	'</ul>' + 
	'</div>';
	$(document).find("div[id^='footer']").html(html);
};

function setUpBackToTop () {
	$(document).find("div[id^='backtop']").html('<p id="back-top"><a href="#top"><span></span>Back to Top</a></p>');
	
	$("#back-top").hide();

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('#back-top a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
};

function OpenContent () {
	this.lastOpened;

	this.openContent = function (title, container) {
		if(this.lastOpened != undefined)
			$(this.lastOpened).hide(500);
		else
			$('#default-content').hide(500);

		$('.title').text(title);
		$(container).show(500);
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		this.lastOpened = container;
	}
};

function show(title, url) {
	url.replace(/:/g, '%3A');
	url.replace(/\//g, '%2F');
	$("#show").text(title);
	$("#show").show(1000);
	$("#code").html('<img src="http://qrfree.kaywa.com/?l=1&s=8&d=' + url + '" alt="QRCode"/>');
	$("#code").show(1000);
	$("#button").show(1000);
	$('html,body').animate({scrollTop: ($("#code").offset().top-$('#header').outerHeight(true))+'px'}, 1000);
	$("#hidr").click(hide);
};

function hide() {
	$("#show").text("");
	$("#show").hide(1000);
	$("#code").hide(1000);
	$("#button").hide(1000);
};

function syntaxHighlight(obj) {
  var json = JSON.stringify(obj, undefined, 4);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
};
