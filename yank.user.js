// ==UserScript==
// @name         HackerYank
// @version      0.1
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
                this.breadcrumb = pathArray.map(function(cur) {
                    return cur.split(' ').join('_');
                }).join('/');
                this.message = 'Solution to ' + pathArray.join(' > ') + ' > ' + this.progName;
                this.filename = filename;
                this.outCode = [];
                this.addCode = function(text) {
                    this.outCode.push(text);
                };
                this.allCode = function() {
                    result = '';
                    this.outCode.forEach(function(cur) {
                        result += cur;
                    });
                    return result;
                };
            };

            Solution.prototype.genScript = function() {
                var script = '#!/bin/bash\n';
                script += 'HACKERRANK_REPO=~/Dev/hackerrank/hackerrank-code\n';
                script += 'BCRUMB=' + this.breadcrumb + '\n';
                script += 'CODE_FILENAME=' + this.filename + '\n';
                script += 'if [ ! -d $HACKERRANK_REPO ]; then\n';
                script += '  echo $HACKERRANK_REPO does not exist;\n';
                script += 'elif [ ! -d $HACKERRANK_REPO/.git ]; then\n';
                script += '  echo $HACKERRANK_REPO is not a git repo;\n';
                script += 'else\n';
                script += '  mkdir -p $HACKERRANK_REPO/$BCRUMB\n';
                script += '  if [ -d $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME ]; then\n';
                script += '    echo $CODE_FILENAME already exists;\n';
                script += '  else\n';
                script += '    touch $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME\n';
                this.outCode.forEach(function(cur) {
                    script += '    echo "' + cur + '" >> $HACKERRANK_REPO/$BCRUMB/$CODE_FILENAME;\n';
                });
                script += ' fi\n';
                script += 'fi\n';
                script += 'cd $HACKERRANK_REPO/$BCRUMB/\n';
                script += 'git add $CODE_FILENAME\n';
                script += 'git commit -m "' + this.message + '"\n';
                return script;
            };

            Solution.prototype.genJSON = function() {
                var result = {};
                result.progName = this.progName;
                result.breadcrumb = this.breadcrumb;
                result.message = this.message;
                result.filename = this.filename;
                result.allCode = this.allCode;
                return JSON.stringify(result);
            };

            var scrapePath = function() {
                var pathArray = [];
                $(".bcrumb span").each(function() {
                    pathArray.push(this.textContent);
                });
                return pathArray;
            };

            var genFilename = function(is_json) {
                var urlArray = window.location.pathname.split('/');
                var lang = $(".pull-left .msT").text().replace(/^\s+|\s+$/g,'').split(' ')[1];
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

            var genSolution = function(filename) {
                var solution = new Solution(scrapePath(), genFilename());
                $(".CodeMirror-code div pre > span").each(function() {
                    solution.addCode(this.textContent);
                });
                return solution;
            };

            var addLinkToPage = function() {
                var spot = $(".submissions-details .pull-left p");
                var spotText = spot.text();
                spot.html("<a>" + spotText + "</a>");
                var tag = spot.find("a");
                tag.attr("href", "data:text/plain;charset=UTF-8," + encodeURIComponent(genSolution().genJSON()));
                tag.attr("download", "hr_download.json");
            };

            addLinkToPage();
        }, 3000);
    });
})();
