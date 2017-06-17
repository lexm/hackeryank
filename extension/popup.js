// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTab(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.log(tab);
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(tab);
  });

// function getCurrentTabUrl(callback) {
//   // Query filter to be passed to chrome.tabs.query - see
//   // https://developer.chrome.com/extensions/tabs#method-query
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };
//
//   chrome.tabs.query(queryInfo, function(tabs) {
//     // chrome.tabs.query invokes the callback with a list of tabs that match the
//     // query. When the popup is opened, there is certainly a window and at least
//     // one tab, so we can safely assume that |tabs| is a non-empty array.
//     // A window can only have one active tab at a time, so the array consists of
//     // exactly one tab.
//     var tab = tabs[0];
//
//     // A tab is a plain object that provides information about the tab.
//     // See https://developer.chrome.com/extensions/tabs#type-Tab
//     var url = tab.url;
//
//     // tab.url is only available if the "activeTab" permission is declared.
//     // If you want to see the URL of other tabs (e.g. after removing active:true
//     // from |queryInfo|), then the "tabs" permission is required to see their
//     // "url" properties.
//     console.log(tab);
//     console.assert(typeof url == 'string', 'tab.url should be a string');
//
//     callback(url);
//   });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTab(function(tab) {
    chrome.tabs.executeScript({file: 'vendor/jquery-1.9.0.min.js'}, function() {
      chrome.tabs.executeScript(null, {
        code:
        '  setTimeout(function() {
            \'use strict\';

            var Solution = function(pathArray, filename) {
              pathArray.shift();
              this.progName = pathArray.pop();
              this.pathArray = pathArray.map(function(cur) {
                return cur.split(' ').join('_');
              });
              this.message = \'Solution to \' + pathArray.join(' > ') + ' > ' + this.progName;
              this.filename = filename;
              var outCode = [];
              this.addCode = function(text) {
                outCode.push(text);
              };
              this.allCode = function() {
                return outCode.join(\'\n\').replace(/[\u200B-\u200D\uFEFF]/g, '');
              };
            };

            Solution.prototype.genJSON = function() {
              var result = {};
              result.progName = this.progName;
              result.pathArray = this.pathArray;
              result.message = this.message;
              result.filename = this.filename;
              result.allCode = this.allCode();
              return JSON.stringify(result);
            };

            var scrapePath = function() {
              var pathArray = [];
              var bcrumb = document.getElementsByClassName(\'bcrumb\');
              var bcSpan = bcrumb[0].getElementsByTagName(\'span\');
              for(var nodeNum = 0; nodeNum < bcSpan.length; nodeNum++) {
                pathArray.push(bcSpan[nodeNum].textContent);
              }
              return pathArray;
            };

            var genFilename = function(is_json) {
              var urlArray = window.location.pathname.split('/');
              var pullLeft = document.getElementsByClassName(\'pull-left\');
              var langEle = [];
              var nodeNum = 0;
              while(!langEle.length && nodeNum < pullLeft.length) {
                langEle = pullLeft[nodeNum].getElementsByClassName(\'msT\');
                nodeNum++;
              }
              var lang = langEle[0].textContent.replace(/^\s+|\s+$/g,'').split(' ')[1];
              var ext = \'\';
              if(lang === \'Python\' || lang === \'Pypy\') {
                ext = \'.py\';
              } else if(lang === \'JavaScript\') {
                ext = \'.js\';
              } else if(lang === \'BASH\') {
                ext = \'.sh\';
              } else if(lang === \'MySQL\') {
                ext = \'.sql\';
              }
              if(is_json) {
                return urlArray[2] + \'.json\';
              } else {
                return urlArray[2] + ext;
              }
            };

            var genSolution = function() {
              var solution = new Solution(scrapePath(), genFilename());
              var lineEle = document.getElementsByClassName(\'CodeMirror-line\');
              for(var lineNum = 0; lineNum < lineEle.length; lineNum++) {
                solution.addCode(lineEle[lineNum].textContent);
              }
              return solution;
            };

            var addLinkToPage = function() {
              var subDetails = document.getElementsByClassName(\'submissions-details\');
              var sdPullLeft = subDetails[0].getElementsByClassName(\'pull-left\');
              var spot = sdPullLeft[0].firstElementChild;
              var spotText = spot.textContent;
              spot.innerHTML = \'<a>\' + spotText + \'</a>\';
              var tag = spot.firstElementChild;
              tag.setAttribute(\'href\', \'data:text/plain;charset=UTF-8,\' + encodeURIComponent(genSolution().genJSON()));
              tag.setAttribute(\'download\', \'hr_download.json\');
            };

            addLinkToPage();'
      });
    })
  })

});
