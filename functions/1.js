// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow, HtmlResponse} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

app.intent('Default Welcome Intent', (conv) => {
	conv.ask(`Welcome to the quiz app! Do you want to start with the first question?`);
});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('startgame', (conv) => {
  	conv.ask(`Choose an animal`);
});

app.intent('answerIntent', (conv, {animals}) => {
  	if(animals == 'dog'){
    	conv.ask ('Right Answer');
    } else {
      	conv.ask('Wrong Answer');
    }  
});

app.intent('Default Fallback Intent', (conv) => {
  conv.ask(`I am in Fallback`);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);


  