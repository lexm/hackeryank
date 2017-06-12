# hackeryank

This is a set of scripts I wrote to automate the process of saving, adding, and committing my solutions to  challenges on HackerRank (https://www.hackerrank.com/) to my own GitHub repo. "yank.js" extracts the solution code from results shown on the "Submissions" tab, then generates a JSON download containing that code and associated metadata. "process.js" will create a file with the solution code in the proper place in the repo, add and them commit it with an appropriate message.

This code is currently in pre-alpha. It's in no way secure, so it's use is not recommended for anyone not interested in participating in its development. At minumum, this requires the ability to read the code (both JavaScript/JQuery and BASH) to verify that it does what I say it does. It's currently run by copying and pasting the 'yank.js' code into the browser console (after you've read the code, of course). This will change the "Language:" text in the upper left hand corner of the "Submitted Code" box into a link. Clicking on that link will download the generated BASH script. Running that script (again, after you've read it and understand what it does) will, under the right circumstances (e.g., a working repo in the location referenced by $HACKERRANK_REPO), create a copy of the solution code in a file with a suitable name, then 'git add' and 'git commit' it with a fitting message.

On deck for future improvements:

* Refactor to move scraping into it's own function
* Adapt so it runs on TamperMonkey/GreaseMonkey, and/or
* Rewrite as a Chrome extension
* Replace download/process link with labeled button
* Write a backend w/ API to replace BASH scripting



