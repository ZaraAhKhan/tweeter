/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const initialTweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1639357132082
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1639443532082
  }
];

const createTweetElement = function(tweet) {
  let time = timeago.format(tweet.created_at)
  const tweetElement = `
  <article class ="tweet">
    <header>
      <span class="twitter-img">
      <span><img src = ${tweet.user.avatars}></span>
      <span class="twitter-name">${tweet.user.name}</span></span>
      <span class="twitter-handle">${tweet.user.handle}</span>
    </header>
    <br>
    <span class="tweet-content">${tweet.content.text}</span> 
      <br>
      <br>
    <hr/>
  <footer>
      <span>${time}</span> 
      <div class="tweet-icons">
      <span><i class="fa-solid fa-flag"></i></span>
      <span><i class="fa-solid fa-retweet"></i></span>
      <span><i class="fa-solid fa-heart"></i></span>
      </div>
    </footer>`;
  return tweetElement;
};


const renderTweetElements = function(target) {
  //iterate over the initialtweets object
  for (let tweet of initialTweets) {
    // pass to a function to create a tweet element
    const newElement = createTweetElement(tweet);
    // attach the element to the DOM
    target.append(newElement);

  }
};

$(document).ready(function() {
  // get the element where the new element needs to be attached
  const tweetContainer = $('#tweet-container');
  renderTweetElements(tweetContainer);
  
  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets/",
      data: $(this).serialize()
    });
  });
  // const loadTweets = function() {

  // }

});