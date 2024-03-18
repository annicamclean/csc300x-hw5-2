"use strict";
const express = require("express");
const app = express();
app.use(express.static("public"));

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware


//make sure you install multer (npm install multer)
const multer = require("multer");
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher told him it was a piece of cake!'
    },
    {
        'joke': 'What kind of tree fits in your hand?',
        'response': 'A palm tree'
    },
    {
        'joke': 'What is worse than raining cats and dogs?',
        'response': 'Hailing taxis'
    }
];
let lameJoke = [
    {
        'joke': 'Which bear is the most condescending?',
        'response': 'Pan-DUH'
    },
    {
        'joke': 'What would the Terminator be called in his retirement?',
        'response': 'The Exterminator'
    }
];

//Request: http://localhost:3000/jokebook/categories
app.get("/jokebook/categories", (request, response) => {
    response.json(categories);
});

//Request: http://localhost:3000/jokebook/joke/:category
app.get("/jokebook/joke/:category", function (request, response) {
    if (request.params.category == "funnyJoke") {
        response.json(funnyJoke);
    } else if (request.params.category == "lameJoke") {
        response.json(lameJoke);
    } else {
        response.status(400).send('error: no category listed for ' + request.params.category);
    }
});

app.post("/jokebook/joke/new", function (req, resp) {
    const category = req.body.category;
    const joke = req.body.joke;
    const response = req.body.response;

    if (!category || !joke || !response && (category !== "funnyjoke" || category !== "lamejoke")) {
        resp.status(400).send("error: invalid or insufficient user input");
    } else {
        let newJoke = req.body;
        delete newJoke['category'];
        if (category === 'funnyjoke') {
            funnyJoke.push(newJoke);
            resp.json(funnyJoke);
        } else {
            lameJoke.push(newJoke);
            resp.json(lameJoke);
        }

    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT + "!");
});