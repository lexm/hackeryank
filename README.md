 # hackeryank

This is a set of scripts I wrote to automate the process of saving, adding, and committing my solutions to  challenges on HackerRank (https://www.hackerrank.com/) to my own GitHub repo. "yank.user.js" extracts the solution code from results shown on the "Submissions" tab, then generates a JSON download containing that code and associated metadata. Running the 'hyank' utility with that JSON as input will create a file with the solution code in the proper place in the repo, add and them commit it with an appropriate message.

The "yank.user.js" script can be loaded using TamperMonkey. When it's running, the user navigates to one of the problems they've already solved, and chooses "View Results". Doing so will lead to changing the "Language:" text in the upper left hand corner of the "Submitted Code" box into a link. Clicking on that link will download the generated JSON.

Running the utility (found in the hackeryank-util repo) on a local command prompt with the JSON file as a parameter will, under the right circumstances (e.g., a working repo in the location referenced by the $HACKERRANK_REPO environment variable), create a copy of the solution code in a file with a suitable name, then 'git add' and 'git commit' it with a fitting message.

On deck for future improvements:

* Rewrite as a browser extension
* Replace download/process link with labeled button
* Write a backend w/ API to handle accepting the JSON
