const fs = require('fs');
const serviceAccount = require("../marknotes-f903b-firebase-adminsdk-j4k2c-edb881b60b.json");

// Convert the JSON object to a string
const serviceAccountString = JSON.stringify(serviceAccount);

console.log(serviceAccountString);