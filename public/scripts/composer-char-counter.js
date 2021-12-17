$(document).ready(function() {
  //traverse the DOM tree to find the .counter class
  let counter = $('.content').find('.counter');
  $('#tweet-text').on('input',function() {
    counter[0].value = (140 - (this.value.length));
    if (counter[0].value < 0) {
      $('output').addClass('my-class');
    } else {
      $('output').removeClass('my-class');
    }
  });
      
});