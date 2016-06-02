function my_favorite_function(){
        
            // get titles from page
            var headerTags = document.getElementsByClassName('gs_rt');
            var titles = [];
            for (var i = 0; i < headerTags.length; i++) {
                var aTag = headerTags[i].getElementsByTagName('a');
                if (aTag.length === 0) { 
                  titles.push(headerTags[i].textContent);
                  continue;
                }
                else { 
                      titles.push(aTag[0].textContent);}
                
            }
            // send titles back to background for posting
            chrome.runtime.sendMessage({'message': 'post_titles', 'titles': titles});

              if (document.readyState === 'complete') {
              	var next_page = document.getElementsByClassName('gs_ico_nav_next')[0].parentElement.href;
              	//send next url to background for speed check
          		chrome.runtime.sendMessage({'message': 'initiate_redirect', 'next_page': next_page}); 

        }
    }


   
   window.onload = my_favorite_function();
   chrome.runtime.onMessage.addListener(
   	//redirects to next page
   		function(request , sender, sendReponse) {
   			if ( request.message === 'go_for_redirect') {
   				window.location.assign(request.next_page);
   				
   			}
   		} 
   		);

