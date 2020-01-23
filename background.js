chrome.browserAction.onClicked.addListener(function(tab) {
  let toFind = prompt('Search for HTML element (jQuery notation): ', 'a');    
  Promise.all([
    onloadPromise("jquery-3.2.1.min.js"),
    ]).then( () => {
      chrome.tabs.insertCSS(null, {file: "styles.css" });
      chrome.tabs.executeScript(null, {file:"app.js" }, function(url){
          chrome.tabs.executeScript(null, {code:`extIncapsulator("${toFind}")`} ); // !! unsafe quotes
        })
    });
});

onloadPromise = function(src){
  return new Promise( resolve =>{
    chrome.tabs.executeScript(null, {file: src}, () => resolve() );
  })
}




