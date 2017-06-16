// ==UserScript==
// @name         HackerYank
// @version      0.1.4
// @namespace    http://www.lexmyers.com/
// @description  Saves one's HackerRank solutions for adding to a repo
// @include      https://www.hackerrank.com/challenges/*
// @author       Lex Myers
// ==/UserScript==

(function() {
  $(document).ready(function() {
    setTimeout(function() {
      'use strict';

      var Solution = function(pathArray, filename) {
        pathArray.shift();
        this.progName = pathArray.pop();
        this.pathArray = pathArray.map(function(cur) {
          return cur.split(' ').join('_');
        });
        this.message = 'Solution to ' + pathArray.join(' > ') + ' > ' + this.progName;
        this.filename = filename;
        var outCode = [];
        this.addCode = function(text) {
          outCode.push(text);
        };
        this.allCode = function() {
          return outCode.join('\n').replace(/[\u200B-\u200D\uFEFF]/g, '');
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
        var bcrumb = document.getElementsByClassName('bcrumb');
        var bcSpan = bcrumb[0].getElementsByTagName('span');
        for(var nodeNum = 0; nodeNum < bcSpan.length; nodeNum++) {
          pathArray.push(bcSpan[nodeNum].textContent);
        }
        return pathArray;
      };

      var genFilename = function(is_json) {
        var urlArray = window.location.pathname.split('/');
        var pullLeft = document.getElementsByClassName('pull-left');
        var langEle = [];
        var nodeNum = 0;
        while(!langEle.length && nodeNum < pullLeft.length) {
          langEle = pullLeft[nodeNum].getElementsByClassName('msT');
          nodeNum++;
        }
        var lang = langEle[0].textContent.replace(/^\s+|\s+$/g,'').split(' ')[1];
        var ext = '';
        if(lang === 'Python' || lang === 'Pypy') {
          ext = '.py';
        } else if(lang === 'JavaScript') {
          ext = '.js';
        } else if(lang === 'BASH') {
          ext = '.sh';
        } else if(lang === 'MySQL') {
          ext = '.sql';
        }
        if(is_json) {
          return urlArray[2] + '.json';
        } else {
          return urlArray[2] + ext;
        }
      };

      var genSolution = function() {
        var solution = new Solution(scrapePath(), genFilename());
        var lineEle = document.getElementsByClassName('CodeMirror-line');
        for(var lineNum = 0; lineNum < lineEle.length; lineNum++) {
          solution.addCode(lineEle[lineNum].textContent);
        }
        return solution;
      };

      var addLinkToPage = function() {
        var subDetails = document.getElementsByClassName('submissions-details');
        var sdPullLeft = subDetails[0].getElementsByClassName('pull-left');
        // var spot = $('.submissions-details .pull-left p');
        // var spotText = spot.text();
        // spot.html('<a>' + spotText + '</a>');
        // var tag = spot.find('a');
        // tag.attr('href', 'data:text/plain;charset=UTF-8,' + encodeURIComponent(genSolution().genJSON()));
        // tag.attr('download', 'hr_download.json');
      };

      addLinkToPage();
    }, 3000);
  });
})();
