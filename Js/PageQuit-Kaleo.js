// JavaScript Document
function setup(){
	'use strict';
	var textInput;
	textInput = document.getElementById('message');
	textInput.focus();
}
window.addEventListener('DOMContentLoaded', setup, false);

window.addEventListener('beforeunload', function(event){
	'use strict';
	var message = 'You have changes that have not been saved...';
	(event || window.event).returnValue = message;
	return message;
});