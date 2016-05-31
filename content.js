chrome.runtime.onMessage.addListener(

    function(request, sender, sendResponse) {
        if (request.message === 'get_titles') {
            // get titles from page
            var headerTags = document.getElementsByClassName('gs_rt');
            var titles = [];
            for (var i = 0; i < headerTags.length; i++) {
                var aTag = headerTags[i].getElementsByTagName('a');
                titles.push(aTag[0].innerText);
            }

            // send titles back to background for posting
            chrome.runtime.sendMessage({'message': 'post_titles', 'titles': titles});

            if (document.readyState === 'complete') {
            //Navigates to next page
                var urlTags = document.getElementById('gs_n');
                urlTags = urlTags.getElementsByTagName('a');
                var urls = [];
                for (var i = 0; i < urlTags.length; i++) {
                     var aUrl = urlTags[i].getAttribute('href');
                      urls.push(aUrl);
                  }
                 var newUrl = urls.slice(-1)[0];
                 window,location.assign(newUrl);

            }

        }
    }
)
