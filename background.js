chrome.browserAction.onClicked.addListener(function(tab) {
  const init = () => {
    chrome.tabs.insertCSS(null, { file: "styles.css" });
    chrome.tabs.executeScript(null, { file: "app.js" }, function (url) {
      chrome.tabs.executeScript(null, { code: `extIncapsulator()` }); // !! unsafe quotes
    })
  }
  init();
  // Promise.all([
  //   onloadPromise("jquery-3.2.1.min.js"),
  //   ]).then( init );
});

onloadPromise = function(src){
  return new Promise( resolve =>{
    chrome.tabs.executeScript(null, {file: src}, () => resolve() );
  })
}




