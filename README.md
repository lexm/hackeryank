# hackeryank

This is a set of scripts I wrote to automate the process of saving, adding, and committing my solutions to  challenges on HackerRank (https://www.hackerrank.com/) to my own GitHub repo. "yank.user.js" extracts the solution code from results shown on the "Submissions" tab, then generates a JSON download containing that code and associated metadata. "process.js" will create a file with the solution code in the proper place in the repo, add and them commit it with an appropriate message.

This code is currently in pre-alpha. In its current condition, using it requires that "yank.js" be pasted into the browser console, so it's in no way secure. Its use is not recommended for anyone not interested in participating in its development. At minumum, this requires the ability to read the JavaScript code and verify that it does what I say it does. Running the "yank.js" code in the browser console will change the "Language:" text in the upper left hand corner of the "Submitted Code" box into a link. Clicking on that link will download the generated JSON. 

Running "process.js" on a local command prompt with the JSON file as a parameter will, under the right circumstances (e.g., a working repo in the location referenced by the $HACKERRANK_REPO environment variable), create a copy of the solution code in a file with a suitable name. At that point one can then 'git add' and 'git commit' it with a fitting message.

On deck for future improvements:

* Include running "git add" and "git commit" in "process.js"
* Rewrite as a browser extension
* Replace download/process link with labeled button
* Write a backend w/ API to handle accepting the JSON



