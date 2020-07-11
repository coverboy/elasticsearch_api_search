'use strict';

const getSelectedESVersion = async() => {
  return new Promise(resolve => {
    chrome.storage.sync.get('selectedEsVer', function(data) {
      resolve(data.selectedEsVer);
    });
  });
}

const replaceStringCurrent = (inputString, replaceWith) => {
  const result = inputString.replace("current", replaceWith);
  return result;
}

const replaceStringVersion = (inputString, replaceWith) => {
  const result = inputString.replace(/\d\.\d/gi, replaceWith);
  return result;
}

const replaceStringVersionX = (inputString, replaceWith) => {
  const result = inputString.replace(/\d\.x/gi, replaceWith);
  return result;
}

const replaceUrl = function(originalUrl, selectedVersion) {
  let result = replaceStringCurrent(originalUrl, selectedVersion);
  result = replaceStringVersion(result, selectedVersion);
  result = replaceStringVersionX(result, selectedVersion);
  return result;
};

document.body.onload = async function() {
  const selectedVersion = await getSelectedESVersion();

  if (selectedVersion) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(JSON.stringify(tabs[0]));
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'window.location="' + replaceUrl(tabs[0].url, selectedVersion) +'";'});
    });
  } else {
    document.getElementById('msg').innerText = 'Set Option First!!';
  }
};