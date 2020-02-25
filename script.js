// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Loads the jokes saved in Local Store and adds them
// to the jokes object
var loadJokes = function () {
  var storageJokes = window.localStorage.getItem("myJokes")
  if (storageJokes) {
    var myJokes = JSON.parse(storageJokes)
    jokes = myJokes
  }
}

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')

var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    var html = '<p>' + jokes[requestedJokeKey].setup + '</p><p>' + jokes[requestedJokeKey].punchline + '</p>'
    jokeBox.innerHTML = html
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  loadJokes()
  updateJokesMenu()
  updateDisplayedJoke()
}

// Saves the list of jokes to the Local Storage
var updateLocalStorage = function () {
  var stringified = JSON.stringify(jokes)
  window.localStorage.setItem("myJokes", stringified)
}

// Function to add a joke to the list and
// save it into Local Storage
var addJoke = function () {
  var jokeAbout = document.getElementById('joke-about')
  var jokeSetup = document.getElementById('joke-setup')
  var jokePunchline = document.getElementById('joke-punchline')

  if (jokeAbout.value) {
    jokes[jokeAbout.value] = {
      setup: jokeSetup.value,
      punchline: jokePunchline.value
    }
  }
  updateLocalStorage()
}

// Deletes a joke based on the joke's key and
// updates the Local Storage
var deleteJoke = function (jokeToDelete) {
  if(jokes[jokeToDelete]) {
    delete jokes[jokeToDelete]
  }
  updateLocalStorage()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

var rememberJokeButton = document.getElementById('remember-joke')
rememberJokeButton.addEventListener('click', () => {
  addJoke()
  updatePage()
})

var deleteJokeButton = document.getElementById('delete-joke')
deleteJokeButton.addEventListener('click', () => {
  var jokeToDelete = document.getElementById('delete-joke-about')
  deleteJoke(jokeToDelete.value)
  updatePage()
})
