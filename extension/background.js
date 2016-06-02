chrome.runtime.onMessage.addListener(
	//
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
			return true;
		}
		else if (request.message === "initiate_redirect") {
				chrome.tabs.getSelected(null, function(tab) {
				 var activeTab = tab.id;
				 chrome.tabs.sendMessage(activeTab, {'message': 'go_for_redirect', 'next_page': request.next_page});
			});
			return true;
		}
		
	}
);
	



