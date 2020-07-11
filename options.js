'use strict';

const dropdown = document.getElementById('esVer');
const saveBtn = document.getElementById('saveVer');
const msgArea = document.getElementById('msg');

const saveVer = function() {
  const selectedVersion = dropdown.value;
  chrome.storage.sync.set({selectedEsVer: selectedVersion}, function() {
    console.log('selectedEsVer is ' + selectedVersion);
  })
}

const clearMsgArea = function() {
  msgArea.innerHTML  = '';
}

const setMsgArea = function(inputString) {
  msgArea.innerHTML  =  inputString;
}

dropdown.onchange = function() {
  clearMsgArea();
}

saveBtn.onclick = function() {
  saveVer();
  setMsgArea('saved!!');
}



