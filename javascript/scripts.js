'use strict';

var $modalHeader = $('#infoModal .modal-dialog .modal-content .modal-header .modal-title');
var $modalBody = $('#infoModal .modal-dialog .modal-content .modal-body');
var $modal = $('#infoModal');
var localData;

function loadData() {
	var req = new XMLHttpRequest();
	req.open("GET", "javascript/data.json", true);
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			if (req.status === 200) {
				localData = JSON.parse(req.responseText);
				console.log("Data loaded");
			}
		}
	};
	req.send();
}

function showContent(title) {
	if (localData) {
		var index;
		for (index = 0; index < localData.length; index++) {
			if (localData[index].title === title) {
				break;
			}
		}
		if (typeof index !== 'undefined') {
			$modalHeader.text(localData[index].heading);
			$modalBody.html(localData[index].content);
		}
		else {
			$modalHeader.text("404 - Not Found");
			$modalBody.text("That content was not found in the data file.");
		}
		$modal.modal();
	}
	else {
		$modalHeader.text("Error");
		$modalBody.text("No local data loaded!");
		$modal.modal();
	}
}

$(document).ready(function() {
	$(document).on('click', 'a', function(e) {
		e.preventDefault();
		showContent(e.toElement.hash);
	})
});