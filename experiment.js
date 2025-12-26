let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    // Indicate the plugin type we’re using
    type: jsPsychHtmlKeyboardResponse, 

    stimulus: `<p>For this section of the study we would like for you to complete a word recognition task.<\p>
  <p> You are about to see a series of characters.</p>
  <p>If the characters make up a word, press the <b>W</b> key.</p>
  <p>If the characters do not make up a word, press <b>N</b> key.</p>
  <p>Respond as quickly as you can, do not worry about making errors.</p>
  <p> Between the presentation of each string of letters <b>++++++</b> will appear on the screen.</p>
  <p> To get comfortable with the task, you will begin by completing a short practice round.</p>
  <p>Press <b>W</b> or <b>N</b> to begin.</p>,
    `,

    // Listen for the SPACE key to be pressed to proceed
    choices: ['w', 'n'], 
};

timeline.push(welcomeTrial);

let practice = [
      { characters: 'house', isWord: true },
      { characters: 'potato', isWord: true },
      { characters: 'impulse', isWord: true },
      { characters: 'wallet', isWord: true },
      { characters: 'parking', isWord: true },
      { characters: 'osuhe', isWord: false },
      { characters: 'tapoot', isWord: false },
      { characters: 'lumspie', isWord: false },
      { characters: 'lewtal', isWord: false },
      { characters: 'kriganp', isWord: false },
    ];


// Shuffle the conditions
practice = jsPsych.randomization.repeat(practice, 1);

for (let condition of practice) {
    let practiceTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>${condition.characters}</h1>`,
        choices: ['w', 'n'],
        data:{
          collect:true,
          characters: condition.characters,
        },
        on_finish: function(data) {
          if (data.response == 'w' && condition.isWord == true) {
                data.correct = true;
            } else if (data.response == 'n' && condition.isWord == false) {
                data.correct = true;
            } else {
                data.correct = false;
            }
        }
    }
    timeline.push(practiceTrial);
    
    let fixationTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>++++++</h1>`,
        trial_duration: 500, // 500 milliseconds = .5 seconds
        choices: ['NO KEY']
    }

    timeline.push(fixationTrial);
}

let Testwelcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>Now that you have completed the practice, lets move to the task.</p>
    <p>Remember, if the characters make up a word press <b>W</b>.</p> 
    <p>If the characters do not make up a word press <b>N</b>.</p>
    <p>Respond as fast as you can, do not worry about making errors.</p>
    <p>Press <b>W</b> or <b>N</b> to begin.</p>
    `,
    choices: ['w', 'n'],
};
timeline.push(Testwelcome);


// Shuffle the conditions
Test = jsPsych.randomization.repeat(Test, 1);

for (let condition of Test) {
    let TestTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>${condition.characters}</h1>`,
        choices: ['w', 'n'],
        data:{
          collect:true,
          characters: condition.characters,
        },
        on_finish: function(data) {
          if (data.response == 'w' && condition.isWord == true) {
                data.correct = true;
            } else if (data.response == 'n' && condition.isWord == false) {
                data.correct = true;
            } else {
                data.correct = false;
            }
        }
    }
     timeline.push(TestTrial);
     let fixationTrial = {
       type: jsPsychHtmlKeyboardResponse,
       stimulus: `<h1>++++++</h1>`,
       trial_duration: 500,
       choices: ['NO KEY']
    }
    
    timeline.push(fixationTrial);
}

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        let prefix = 'ldt';
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for completing this section.</h1> 
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
        .get()
        .filter({collect: true})
        .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
        .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);

jsPsych.run(timeline);