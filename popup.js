// const searchTextt = document.getElementById("searchInput");
// const resultsText = document.getElementById("results");
//
// document.getElementById("searchButton").addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//
//   console.log("clicked");
//   chrome.tabs.sendMessage(tabs[0].id, {action: "REPLACE_TEXT", find: searchTextt.value, results: resultsText.value});
//   // window.close();
// });

//Credit for sleep(): https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

const searchButton = document.getElementById("searchButton");
const searchText = document.getElementById("searchInput");
const resultsText = document.getElementById("results");

document.getElementById("searchButton").addEventListener("click", async () => {
    resultsText.innerHTML = "";
    console.log("clicked");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        resultsText.innerHTML = "";
        console.log("clicked");
        chrome.tabs.sendMessage(tabs[0].id, {action: "FIND_TEXT", find: searchText.value, results: resultsText.value});
        // window.close();
        sleep(8000);
        chrome.storage.local.get("output", function(data) {
          resultsText.innerHTML = "";
          console.log(data.output)
          if (data.output === "undefined") {
            console.log("Clear")
          } else {
            resultsText.innerHTML = "";
            resultsText.insertAdjacentHTML('afterbegin',"<ul>" + data.output + "</ul>");
            chrome.storage.local.set({output: "undefined"});

          }
        });
        chrome.storage.local.set({output: "undefined"});

    })
});
