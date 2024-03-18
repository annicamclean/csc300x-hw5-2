"use strict";
(function () {
    const MY_SERVER_BASEURL = "/jokebook";
    window.addEventListener("load", init);
    function init() {
        getRandomJoke();
        document.getElementById("selected-joke-category").addEventListener('click', chooseJokeCategory);
        document.getElementById("search-categories").addEventListener('click', searchJokeCategory);
    }

    let categories = [];
    let funnyJoke = [];
    let lameJoke = [];

    function getRandomJoke() {

        fetch(MY_SERVER_BASEURL + "/categories")
            .then(checkStatus)
            .then((response) => {
                for (const item of response) {
                    categories.push(item);
                }
            })
            .then(() => {
                for (let i = 0; i < categories.length; i++) {
                    fetch(MY_SERVER_BASEURL + "/joke/" + categories[i])
                        .then(checkStatus)
                        .then((jokes) => {
                            for (const item of jokes) {
                                if (categories[i] === 'funnyJoke') {
                                    funnyJoke.push(item);
                                } else {
                                    lameJoke.push(item);
                                }
                            }
                        })
                        .then(() => {
                            let jokeCategoryNum = Math.floor(Math.random() * 2);
                            let randomJoke = {
                                'joke': '',
                                'response': ''
                            };
                            if (jokeCategoryNum === 0) {
                                let randomJokeNum = Math.floor(Math.random() * funnyJoke.length);
                                let newJoke = funnyJoke[randomJokeNum];
                                randomJoke.joke = newJoke.joke;
                                randomJoke.response = newJoke.response;
                            } else {
                                let randomJokeNum = Math.floor(Math.random() * lameJoke.length);
                                let newJoke = lameJoke[randomJokeNum];
                                randomJoke.joke = newJoke.joke;
                                randomJoke.response = newJoke.response;
                            }

                            let randomJokeDiv = id('random-joke');
                            let theJoke = document.createElement('h3');
                            theJoke.innerHTML = "The Joke: " + randomJoke.joke;
                            randomJokeDiv.appendChild(theJoke);
                            let response = document.createElement('h3');
                            response.innerHTML = "The Punch Line: " + randomJoke.response;
                            randomJokeDiv.appendChild(response);

                        })
                        .catch((error) => {
                            console.error("Error: ", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    //make a second function for search bar
    function searchJokeCategory () {
        let categoriesDiv = id('categories-div');
        let x = document.getElementById('category-search').value;
        if(x === "funnyJoke" || x === "lameJoke") {
            while (categoriesDiv.hasChildNodes()) {
                categoriesDiv.removeChild(categoriesDiv.lastChild);
            }
            let jokeType = "";
            let jokeCategory = document.createElement('h2');

            if (x.value === "funnyJoke") {
                jokeType = "funnyJoke";
                jokeCategory.innerHTML = "Funny Jokes";
            } else {
                jokeType = "lameJoke";
                jokeCategory.innerHTML = "Lame Jokes";
            }
            categoriesDiv.appendChild(jokeCategory);

            fetch(MY_SERVER_BASEURL + "/joke/" + jokeType)
                .then(checkStatus)
                .then((jokes) => {
                    //for loop to get all the items
                    //print out the items
                    for (const item of jokes) {
                        let jokeElement = document.createElement('h3');
                        let joke = item['joke'];
                        jokeElement.innerHTML = joke;
                        categoriesDiv.appendChild(jokeElement);

                        let responseElement = document.createElement('h3');
                        let response = item['response'];
                        responseElement.innerHTML = response;
                        categoriesDiv.appendChild(responseElement);
                    }
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        }
    }

    function chooseJokeCategory() {
        let categoriesDiv = id('categories-div');
        let x = document.getElementById('joke-categories');
        if (x.value != "no-option") {
            while (categoriesDiv.hasChildNodes()) {
                categoriesDiv.removeChild(categoriesDiv.lastChild);
            }
            let jokeType = "";
            let jokeCategory = document.createElement('h2');

            if (x.value === "funny") {
                jokeType = "funnyJoke";
                jokeCategory.innerHTML = "Funny Jokes";
            } else {
                jokeType = "lameJoke";
                jokeCategory.innerHTML = "Lame Jokes";
            }
            categoriesDiv.appendChild(jokeCategory);

            fetch(MY_SERVER_BASEURL + "/joke/" + jokeType)
                .then(checkStatus)
                .then((jokes) => {
                    //for loop to get all the items
                    //print out the items
                    for (const item of jokes) {
                        let jokeElement = document.createElement('h3');
                        let joke = item['joke'];
                        jokeElement.innerHTML = joke;
                        categoriesDiv.appendChild(jokeElement);

                        let responseElement = document.createElement('h3');
                        let response = item['response'];
                        responseElement.innerHTML = response;
                        categoriesDiv.appendChild(responseElement);
                    }
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        }
    }


    let newButton = id("add-new-joke-btn");
    newButton.addEventListener("click", function () {
        id("form-popup").style.display = "block";
    });

    let saveButton = id("save-product");
    saveButton.addEventListener("click", function (e) {
        e.preventDefault();
        submitForm();
    });

    let closeButton = id("cancel-btn");
    closeButton.addEventListener("click", function (e) {
        id("form-container").reset();
        id("form-popup").style.display = "none";
    });

    function submitForm() {
        let params = new FormData(id("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        //let corsUrl = 'http://cors-anywhere.herokuapp.com/' + POST_BASEURL;
        fetch(MY_SERVER_BASEURL + "/joke/new", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, ",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(checkStatus)
            .then(chooseJokeCategory)
            .catch(alert);
    }

    /*function refreshTable() {
        document.querySelectorAll("td").forEach((element) => {
            element.remove();
        });

        id("form-popup").style.display = "none";
        id("form-container").reset();
        getAllProducts();
    }*/


    //helper functions
    function id(idName) {
        return document.getElementById(idName);
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response.json();
    }
})();
