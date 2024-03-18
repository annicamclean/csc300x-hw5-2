# *jokebook* API Documentation

## Endpoint 1 - Get Joke Categories
**Request Format:**
    http://localhost:3000/jokebook/categories
**Request Type:**
    GET Request
**Returned Data Format:**
    returns JSON categories
**Description:**
    It is a get request that will return the joke categories that you can chose from
**Example Request:**
    GET /jokebook/categories
**Example Response:**
```
[
  "funnyJoke",
  "lameJoke"
]
```
**Error Handling:**
    No error handling

## Endpoint 2 - Get Jokes In A Category
**Request Format:**
    http://localhost:3000/jokebook/joke/:category
**Request Type:**
    GET Request
**Returned Data Format:**
    returns JSON jokes
**Description:**
    It is a get request that will return the jokes in a certain category if it exist 
**Example Request:**
    GET /jokebook/joke/funnyjoke
**Example Response:**
```
[
  {
    "joke": "Why did the student eat his homework?",
    "response": "Because the teacher told him it was a piece of cake!"
  },
  {
    "joke": "What kind of tree fits in your hand?",
    "response": "A palm tree"
  },
  {
    "joke": "What is worse than raining cats and dogs?",
    "response": "Hailing taxis"
  }
]
```
**Error Handling:**
	If a user inputs a category that does not exist it will tell the user it does not exist and send an error 

## Endpoint 3 - Add New Jokes In A Category
**Request Format:**
    http://localhost:3000/jokebook/joke/new
**Request Type:**
    POST Request
**Returned Data Format:**
    returns JSON jokes
**Description:**
    It will take in a post request for a new joke in a certain category and return the category  of jokes
**Example Request:**
    POST /jokebook/joke/new
	
```
{
  "category": "lamejoke",
  "joke": "Why did the chicken cross the road?",
  "response": "To get to the other side"
}
```

**Example Response:**
```
[
  {
    "joke": "Which bear is the most condescending?",
    "response": "Pan-DUH"
  },
  {
    "joke": "What would the Terminator be called in his retirement?",
    "response": "The Exterminator"
  },
  {
    "joke": "Why did the chicken cross the road?",
    "response": "To get to the other side"
  }
]
```
**Error Handling:**
	If a user forgets to put into one of the parameters or if a category doesn't exist then an error code will be sent to the user
