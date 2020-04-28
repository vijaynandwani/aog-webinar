// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow, HtmlResponse} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});


let questionData = {
	1 : {
      question: 'dawn dutch mice tough',
      answer: 'don\'t touch my stuff'
    },
  	2: {
      question: 'fizz dub hum bing',
      answer: 'fist bumping'
    },
    3: {
        question: 'dome hutch chine firm hey shun',
        answer: 'too much information'
    },
    4: {
        question: 'sheik cons hoop fur thistle',
        answer: 'chicken soup for the soul'
    },
    5: {
        question: 'hoop heard rife fair',
        answer: 'uber driver'
    },
    6: {
        question: 'hay knob putty god dime fourth hat',
        answer: 'ain\'t nobody got time for that'
    },
    7: {
        question: 'abe aura her she\'s chalk lit',
        answer: 'a bar of hersheys chocolate'
    },
    8: {
        question: 'drew ache oar ham hmm ham',
        answer: 'drake or eminem'
    },
    9: {
        question: 'tack spayer',
        answer: 'tax payer'
    },
    10: {
        question: 'mount hen lie inn',
        answer: 'mountain lion'
    },
    11: {
        question: 'ape udder full eye',
        answer: 'a butterfly'
    },
    12: {
        question: 'pitchers heat bell town',
        answer: 'put your seatbelt on'
    },
    13: {
        question: 'sick steamy knits',
        answer: 'sixty minutes'
    },
    14: {
        question: 'chest who wit',
        answer: 'just do it'
    },
    15: {
        question: 'own late aches aim men hit',
        answer: 'only takes a minute'
    },
    16: {
        question: 'door her tex pull horror',
        answer: 'dora the explorer'
    }, 
    17: {
        question: 'eggs pox sole i\'ve',
        answer: 'xbox live'
    }
};

function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}  

function askQuestion(conv){
  	
    // choose a random number
  	let qnumber = randomNumber(1,17);
  	// store the number in userstorage
  	conv.data.qnumber = parseInt(qnumber);
    conv.ask(questionData[qnumber].question);
}

app.intent('Default Welcome Intent', (conv) => {
	conv.ask(`Welcome to the quiz app! Do you want to start with the first question?`);
});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('startgame', (conv) => {
  	askQuestion(conv);
});

app.intent('answerIntent', (conv, {answers}) => {
  	if(answers == questionData[conv.data.qnumber].answer){
    	conv.ask ('Your answer is correct!  Here is your next question.');
    } else {
      	conv.ask('Wrong answer! The correct answer is '+questionData[conv.data.qnumber].answer+'. Here is your next question.');
    }  
  	askQuestion(conv);
});

app.intent('Default Fallback Intent', (conv) => {
  conv.ask('Wrong answer! The correct answer is '+questionData[conv.data.qnumber].answer+' Here is your next question.');
  	askQuestion(conv);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);


  