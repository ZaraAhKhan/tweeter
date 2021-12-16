/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let time = timeago.format(tweet.created_at);
  const safeHTML = escape(tweet.content.text);
  const tweetElement = `
  <article class ="tweet">
    <header>
      <span class="twitter-img">
      <span><img src = ${tweet.user.avatars}></span>
      <span class="twitter-name">${tweet.user.name}</span></span>
      <span class="twitter-handle">${tweet.user.handle}</span>
    </header>
    <br>
    <span class="tweet-content">${safeHTML}</span> 
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

$(document).ready(function() {
  $('.error-message').hide();
 
  $('#tweet-button').click(function() {
    $('html, body').animate({
      scrollTop: $("h2").offset().top
    }, 1000,function() {
      $('textarea').focus();
    });
  });
  
  
  

  const renderTweetElements = function(target,initialTweets) {

    
    //iterate over the initialtweets object
    initialTweets = initialTweets.reverse();
    for (let tweet of initialTweets) {
      // pass to a function to create a tweet element
      const newElement = createTweetElement(tweet);
      // attach the element to the DOM
      target.append(newElement);
  
    }
  };
  // get the element where the new element needs to be attached
  const tweetContainer = $('#tweet-container');
  
  $('form').on('submit', function(event) {
    //prevent browser from loading another page
    event.preventDefault(); 
    
    // if the tweet is an empty string
    if ($('#tweet-text').val().length === 0 || ($('#tweet-text').val()).trim().length === 0) { 
      $('.error-message').hide('fast','swing');
      $('.error-message').slideDown('fast','swing');
      $('.error-message').html('<i class="fa fa-times-circle"></i> The tweet is not long enough!');
      // if the tweet is more that 140 chars
    } else if ($('#tweet-text').val().length > 140) { 
      $('.error-message').hide('fast','swing');
      $('.error-message').slideDown('fast','swing');
      $('.error-message').html('<i class="fa fa-times-circle"></i>The tweet is too  long!');
    } else {
      $('.error-message').hide('fast','swing');
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets/",
        data: $(this).serialize(),
        success: function() {
        //In case the Post tweets was successful, then we will call the load tweets again.
          
          loadTweets();
          
        },
        error: function(err) {
          console.log("There was an error in the tweets", err);
        }
      });
  
      const loadTweets = function() {
        $.ajax({
          url:"http://localhost:8080/tweets/",
          method:"GET"
        })
          .then(function(data) {
            //To empty the container or clear the existing HTML Elements, so that once we get all the tweets, then we display them.
            tweetContainer.empty(); //jQuery function to clear the html elements
            renderTweetElements(tweetContainer,data);
            $('#tweet-text').val(''); //empty the text area after posting and getting the tweet
            $('.counter').val('140'); // reset counter to 140
          });
      };
    }
  });

  
});