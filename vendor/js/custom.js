

(function() {
    let bgInput = document.getElementById('bgColor');
    let txtInput = document.getElementById('txtColor');
    let showBGInput = document.getElementById('showBG');
    let saveButton = document.getElementById('saveButton');
    let demo = document.getElementById("demo");

    chrome.storage.sync.get(['backgroundColor','textColor','showBackgrounds'], function (result) {
    	bgColor = result.backgroundColor;
    	txtColor = result.textColor;
    	showBG = result.showBackgrounds;

    	if(bgColor == null) bgColor = "#1c1c1c";
    	if(txtColor == null) txtColor = "#fff";
    	if(showBG == null) showBG = true;

    	bgInput.value = bgColor;
        txtInput.value = txtColor;
        showBGInput.checked = showBG;
        demo.style.background = bgInput.value;
        demo.style.color = txtInput.value;
    });


    bgInput.onchange = function(){
        demo.style.background = bgInput.value;
    };
    txtInput.onchange = function(){
        demo.style.color = txtInput.value;
    }
    saveButton.onclick = function(){
        chrome.storage.sync.set({'backgroundColor': bgInput.value});
        chrome.storage.sync.set({'textColor': txtInput.value});
        chrome.storage.sync.set({'showBackgrounds': showBGInput.checked});
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    }


})();
