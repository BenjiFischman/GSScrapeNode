// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"message": "get_titles"});
	});
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "post_titles") {
			// post request.titles to localhost
			$.ajax({
				type: 'POST',
				data: JSON.stringify(request.titles),
				contentType: "application/json",
				dataType:'json',
				url: 'http://localhost:8080/write-titles'
			});
		}
	}
);


