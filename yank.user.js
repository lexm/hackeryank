// ==UserScript==
// @name         HackerYank
// @version      0.1
// @namespace    http://www.lexmyers.com/
// @description  Saves one's HackerRank solutions for adding to a repo
// @include      https://www.hackerrank.com/challenges/*
// @author       Lex Myers
// ==/UserScript==

(function(module) {
    'use strict';

    var SolutionData = function(pathArray, filename) {
        pathArray.shift();
        this.progName = pathArray.pop();
        this.breadcrumb = pathArray.join('/');
        this.filename = filename;
        this.outCode = [];
        this.addCode = function(text) {
            this.outCode.push(text);
        };
    };

    SolutionData.prototype.genScript = function() {
        scr = '#!/bin/bash\n';
        scr += 'HACKERRANK_REPO=~/Dev/hackerrank/hackerrank-code\n';
        scr += 'BCRUMB=' + this.breadcrumb + '\n';
        scr += 'CODE_FILENAME=' + this.filename + '\n';
        scr += 'if [ ! -d $HACKERRANK_REPO ]; then\n';
        scr += '  echo $HACKERRANK_REPO does not exist;\n';
        scr += 'elif [ ! -d $HACKERRANK_REPO/.git ]; then\n';
        scr += '  echo $HACKERRANK_REPO is not a git repo;\n';
        scr += 'else\n';
        scr += '  mkdir -p $HACKERRANK_REPO/$BCRUMB\n';
        scr += '  if [ -d $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME ]; then\n';
        scr += '    echo $CODE_FILENAME already exists;\n';
        scr += '  else\n';
        scr += '    touch $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME\n';
        this.outCode.forEach(function(cur) {
            scr += '    echo "' + cur + '" >> $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME;\n';
        });
        scr += ' fi\n';
        scr += 'fi\n';
        return scr;
    }

    var pathArray = [];
    $(".bcrumb span").each(function() {
        pathArray.push(this.textContent);
    });
    var urlArray = window.location.pathname.split('/');
    if(urlArray[3] === 'submissions') {
        var lang = $(".pull-left .msT").text().replace(/^\s+|\s+$/g,'').split(' ')[1];
        var spot = $(".submissions-details .pull-left p");
    } else {
        var lang = $(".select2-container span").text().split(' ')[0];
        var spot = $(".grey-header div:nth-child(5)");
    }
    var ext = '';
    if(lang === 'Python' || lang === 'Pypy') {
        ext = '.py';
    } else if(lang === 'JavaScript') {
        ext = '.js';
    }
    var filename = urlArray[2] + ext;
    var scriptName = urlArray[2] + '_solution.sh';
    var solution = new SolutionData(pathArray, filename);
    $(".CodeMirror-code div pre > span").each(function() {
        solution.addCode(this.textContent);
    });

    var spotText = spot.text();
    spot.html("<a>" + spotText + "</a>");
    var tag = spot.find("a");
    tag.attr("href", "data:text/plain;charset=UTF-8," + encodeURIComponent(solution.genScript()));
    tag.attr("download", scriptName);

})(window);
