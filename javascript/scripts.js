'use strict';

var $modalHeader = $('#infoModal .modal-dialog .modal-content .modal-header .modal-title');
var $modalBody = $('#infoModal .modal-dialog .modal-content .modal-body');
var $modal = $('#infoModal');
var $success = $('#success');
var $error = $('#error');
var localData;

function loadData() {
	var req = new XMLHttpRequest();
	req.open("GET", "javascript/data.json", true);
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			if (req.status === 200) {
				localData = JSON.parse(req.responseText);
				$success.fadeIn();
				setTimeout(function () {
					$success.fadeOut();
				}, 3000);
			}
			else {
				$error.fadeIn();
				setTimeout(function () {
					$error.fadeOut();
				}, 3000);
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

$(document).ready(function () {
	$(document).on('click', 'a', function (e) {
		e.preventDefault();
		showContent(e.toElement.hash);
	});
});