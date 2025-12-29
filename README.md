# Lexical-Decision-Task
Repository for my lexical decision task to see what is primed when people think about the Gaza protests in 2024. This is an attempt to apply the method used by Lodge and Taber 

The code used here is for jspsych to link to a Qualtrics survey

The "index.html" file provides the linkage between the code and the browser

The "experiment.js" file is the Javascript file that contains the prodecure for the LDT.
The "test.js" file is the file containing the words and nonwords for the LDT. The "index.html" file will load this first before the "experiment.js" file because the "experiment.js" file will have to reference it.

The "experiment.js" file also contains the code for a practice round which includes ten sets of letter strings (5 words and 5 nonwords).

For the actual task, there are 9 words each associated with Islam and Judaism. Additionally there are 10 words people who score high on Right Wing Authoritarianism are more likely to recognize.

The nonwords were created by taking the previous 28 words(9 for Islam, 9 for Judaism, and 10 for RWA) and converting them into pronounceable nonwords. This creates 56 letter strings.

In both the practice round and the task round, "+++++++" is presented before each string of letters is introduced.
