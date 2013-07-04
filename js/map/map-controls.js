function BlocksControl(controlDiv, map) {
	controlDiv.style.padding = '5px';
	
	var optionsUI = document.createElement('div');
	optionsUI.style.backgroundColor = 'white';
	optionsUI.style.borderStyle = 'solid';
	optionsUI.style.borderWidth = '1px';
	optionsUI.style.borderColor = 'gray';
	optionsUI.style['-o-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style['-webkit-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style['-moz-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style['-ms-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style.cursor = 'pointer';
	optionsUI.style.textAlign = 'center';
	controlDiv.appendChild(optionsUI);
	
	var optionText = document.createElement('div');
	optionText.style.fontFamily = 'Arial,sans-serif';
	optionText.style.fontSize = '11px';
	optionText.style.padding = '3px 4px 3px 4px';
	optionText.innerHTML = '<label id="polygons-label" for="polygons-show">Show blocks</label><input style="margin-right: 2px" type="checkbox" id="polygons-show">';
	optionsUI.appendChild(optionText);
	
	controlDiv.appendChild(optionsUI);
}

function ViewControl(controlDiv, map) {

	controlDiv.style.padding = '5px';

	// Set CSS for the control border
	var optionsUI = document.createElement('div');
	optionsUI.style.backgroundColor = 'white';
	optionsUI.style.borderStyle = 'solid';
	optionsUI.style.borderWidth = '1px';
	optionsUI.style.borderColor = 'gray';
	optionsUI.style['-o-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style['-webkit-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style['-moz-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style['-ms-box-shadow'] = '2px 2px 7px #000000';
	optionsUI.style.cursor = 'pointer';
	optionsUI.style.textAlign = 'center';
	optionsUI.style.width = '70px';
	controlDiv.appendChild(optionsUI);

	// Set CSS for the control interior
	var optionText = document.createElement('div');
	optionText.style.fontFamily = 'Arial,sans-serif';
	optionText.style.fontSize = '11px';
	optionText.style.padding = '3px 4px 3px 4px';
	optionText.innerHTML = '<b>View</b>';
	optionsUI.appendChild(optionText);

	var optionsPanelUI = document.createElement('div');
	optionsPanelUI.setAttribute('id','panel');
	optionsPanelUI.style.display = 'none';
	optionsPanelUI.style.backgroundColor = 'white';
	optionsPanelUI.style.borderStyle = 'solid';
	optionsPanelUI.style.borderWidth = '1px';
	optionsPanelUI.style.borderColor = 'gray';
	optionsPanelUI.style['-o-box-shadow'] = '2px 2px 7px #000000';
	optionsPanelUI.style['-webkit-box-shadow'] = '2px 2px 7px #000000';
	optionsPanelUI.style['-moz-box-shadow'] = '2px 2px 7px #000000';
	optionsPanelUI.style['-ms-box-shadow'] = '2px 2px 7px #000000';
	optionsPanelUI.style.cursor = 'pointer';
	optionsPanelUI.style.textAlign = 'left';
	controlDiv.appendChild(optionsPanelUI);
	
	var optionsPanelText = document.createElement('div');
	optionsPanelText.style.fontFamily = 'Arial,sans-serif';
	optionsPanelText.style.fontSize = '11px';
	optionsPanelText.style.padding = '3px 4px 3px 4px';
	optionsPanelText.innerHTML = '<form id="poi-type"><input type="radio" name="type" value="0" checked>POIs<br/><input name="type" type="radio" value="1">Events<br/><input name="type" type="radio" value="2">Route</form>';
	optionsPanelUI.appendChild(optionsPanelText);
			
	google.maps.event.addDomListener(optionsUI, 'mouseover', function() {
		if(!$('#panel').is(':animated') && $('#panel').is(':hidden'))
    		$('#panel').slideToggle('slow');
	});
	
  	google.maps.event.addDomListener(optionsUI, 'click', function() {
    	$('#panel').slideToggle('slow');
	});
}

