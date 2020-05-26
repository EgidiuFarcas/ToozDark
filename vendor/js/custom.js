

(function() {
    let bgInput = document.getElementById('bgColor');
    let txtInput = document.getElementById('txtColor');
    let showBGInput = document.getElementById('showBG');
    let saveButton = document.getElementById('saveButton');
    let resetButton = document.getElementById('resetColors');
    let enableDark = document.getElementById('enableDark');
    let stripContent = document.getElementById('stripContent');
    let demo = document.getElementById("demo");
    let bgColor, txtColor, showBG, en;
    chrome.storage.sync.get(['backgroundColor','textColor','showBackgrounds', 'enableDark', 'stripContent'], function (result) {
    	bgColor = result.backgroundColor;
    	txtColor = result.textColor;
      showBG = result.showBackgrounds;
      en = result.enableDark;
      stripContentV = result.stripContent;

    	if(bgColor == null) bgColor = "#1c1c1c";
    	if(txtColor == null) txtColor = "#ffffff";
    	if(showBG == null) showBG = true;
        if (en == null) en = true;

    	bgInput.value = bgColor;
      txtInput.value = txtColor;
      showBGInput.checked = showBG;
      enableDark.checked = en;
      stripContent.checked = stripContentV;
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
        chrome.storage.sync.set({ 'showBackgrounds': showBGInput.checked });
        chrome.storage.sync.set({ 'enableDark': enableDark.checked });
        chrome.storage.sync.set({ 'stripContent': stripContent.checked });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    }

    resetButton.onclick = function () {
        chrome.storage.sync.set({ 'backgroundColor': "#1c1c1c" });
        chrome.storage.sync.set({ 'textColor': "#ffffff" });
        chrome.storage.sync.set({ 'showBackgrounds': true });
        chrome.storage.sync.set({ 'enableDark': true });
        chrome.storage.sync.set({ 'stripContent': false });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        });
    }


})();
